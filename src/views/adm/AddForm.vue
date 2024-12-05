<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/adm/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Add Mainan</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="form-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Add New Mainan</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <form @submit.prevent="submitForm">
              <!-- Nama Field -->
              <ion-item class="input-item">
                <ion-label position="stacked">Nama Mainan</ion-label>
                <ion-input
                  type="text"
                  v-model="form.nama"
                  placeholder="Masukkan nama mainan"
                  required
                ></ion-input>
              </ion-item>

              <!-- Deskripsi Field -->
              <ion-item class="input-item">
                <ion-label position="stacked">Deskripsi Mainan</ion-label>
                <ion-textarea
                  v-model="form.deskripsi"
                  placeholder="Masukkan deskripsi mainan"
                  required
                ></ion-textarea>
              </ion-item>

              <!-- Submit Button -->
              <ion-button
                expand="block"
                type="submit"
                color="primary"
                :disabled="isSubmitting"
                class="submit-button"
              >
                <ion-spinner slot="start" v-if="isSubmitting"></ion-spinner>
                Tambah Mainan
              </ion-button>

              <!-- Reset Button -->
              <ion-button
                expand="block"
                type="button"
                color="medium"
                @click="resetForm"
                class="reset-button"
              >
                Reset
              </ion-button>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/utils/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Firestore functions

// Form model
const form = ref({
  nama: '',
  deskripsi: '',
});

const router = useRouter();
const isSubmitting = ref(false);

// Function to reference the 'mainan' collection in Firestore
const getMainanCollectionRef = () => collection(db, 'mainan');

// Function to add a new toy to Firestore
const addMainan = async (mainan) => {
  try {
    const mainanCollectionRef = getMainanCollectionRef();
    const docRef = await addDoc(mainanCollectionRef, {
      ...mainan,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error('Error adding mainan:', error);
    throw error;
  }
};

// Function to submit the form
const submitForm = async () => {
  isSubmitting.value = true;
  try {
    const newMainan = {
      nama: form.value.nama,
      deskripsi: form.value.deskripsi,
    };

    const mainanId = await addMainan(newMainan); // Call addMainan function
    console.log('Mainan added with ID:', mainanId);

    alert('Mainan berhasil ditambahkan!');
    router.push('/adm/home'); // Navigate to home page or desired route
  } catch (error) {
    console.error('Error during form submission:', error);
    alert('Gagal menambahkan mainan. Silakan coba lagi.');
  } finally {
    isSubmitting.value = false;
  }
};

// Function to reset the form
const resetForm = () => {
  form.value = {
    nama: '',
    deskripsi: '',
  };
};
</script>

<style scoped>
ion-content {
  --background: #f7f9fc;
}

.form-container {
  padding: 20px;
}

ion-card {
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
}

ion-card-title {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.input-item {
  margin-top: 15px;
  --highlight-color-focused: #4caf50;
  --placeholder-color: #aaa;
  --placeholder-font-style: italic;
}

.submit-button {
  margin-top: 20px;
  --background: #4caf50;
  --background-hover: #45a049;
  --box-shadow: 0 4px 8px rgba(76, 175, 80, 0.4);
  font-weight: bold;
}

.reset-button {
  margin-top: 10px;
  --background: #e0e0e0;
  --background-hover: #d6d6d6;
  --color: #555;
}
</style>
