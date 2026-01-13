// Script to clear all participants from Firestore
// Run this before going live to remove all test entries

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { firebaseConfig } from './config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearParticipants() {
    console.log('='.repeat(80));
    console.log('FIRESTORE CLEANUP - Deleting All Test Participants');
    console.log('='.repeat(80));
    console.log();

    try {
        console.log('📡 Connecting to Firestore...');
        const participantsRef = collection(db, 'participants');

        console.log('📊 Fetching all participants...');
        const snapshot = await getDocs(participantsRef);

        const count = snapshot.size;
        console.log(`   ✓ Found ${count} participant(s) to delete`);
        console.log();

        if (count === 0) {
            console.log('✅ No participants found. Database is already clean!');
            return;
        }

        console.log('🗑️  Deleting participants...');
        let deleted = 0;

        for (const doc of snapshot.docs) {
            const data = doc.data();
            console.log(`   Deleting: ${data.teamName || 'Unknown'} (${data.name || 'Unknown'})`);
            await deleteDoc(doc.ref);
            deleted++;
        }

        console.log();
        console.log('='.repeat(80));
        console.log(`✅ CLEANUP COMPLETE - Deleted ${deleted} participant(s)`);
        console.log('='.repeat(80));
        console.log();
        console.log('Your Firestore database is now ready for production!');

    } catch (error) {
        console.error('❌ Error clearing Firestore:', error);
        process.exit(1);
    }
}

// Run if called directly
clearParticipants();
