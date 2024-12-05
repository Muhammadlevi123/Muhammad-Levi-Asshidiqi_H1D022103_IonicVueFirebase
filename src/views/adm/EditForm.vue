<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/adm/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Edit Mainan</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="form-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Edit Mainan Information</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <form @submit.prevent="submitForm">
              <!-- Nama Mainan -->
              <ion-item class="input-item">
                <ion-label position="stacked">Nama Mainan</ion-label>
                <ion-input
                  type="text"
                  v-model="form.nama"
                  placeholder="Masukkan nama mainan"
                  required
                ></ion-input>
              </ion-item>

              <!-- Deskripsi Mainan -->
              <ion-item class="input-item">
                <ion-label position="stacked">Deskripsi Mainan</ion-label>
                <ion-textarea
                  v-model="form.deskripsi"
                  placeholder="Masukkan deskripsi mainan"
                  required
                ></ion-textarea>
              </ion-item>

              <!-- Tombol Save -->
              <ion-button
                expand="block"
                type="submit"
                color="primary"
                :disabled="isSubmitting"
                class="submit-button"
              >
                <ion-spinner slot="start" v-if="isSubmitting"></ion-spinner>
                Simpan Perubahan
              </ion-button>

              <!-- Tombol Reset -->
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '@/utils/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore functions

// Form data model
const form = ref({
  nama: '',
  deskripsi: '',
});

const isSubmitting = ref(false);
const router = useRouter();

// Mendapatkan mainanId dari parameter URL
const route = useRoute();
const mainanId = route.params.mainanId;

// Fetch data mainan saat komponen di-mount
onMounted(async () => {
  if (mainanId) {
    await fetchMainanData(mainanId);
  }
});

// Fungsi untuk mengambil data mainan dari Firestore
const fetchMainanData = async (mainanId) => {
  try {
    const mainanDocRef = doc(db, 'mainan', mainanId); // Asumsi koleksi 'mainan'
    const mainanDocSnap = await getDoc(mainanDocRef);

    if (mainanDocSnap.exists()) {
      const mainanData = mainanDocSnap.data();
      form.value = { ...mainanData };
    } else {
      console.error('Data mainan tidak ditemukan!');
    }
  } catch (error) {
    console.error('Error fetching mainan data:', error);
  }
};

// Fungsi untuk menyimpan perubahan
const submitForm = async () => {
  isSubmitting.value = true;
  try {
    const mainanDocRef = doc(db, 'mainan', mainanId); // Referensi dokumen di Firestore

    await updateDoc(mainanDocRef, {
      nama: form.value.nama,
      deskripsi: form.value.deskripsi,
      updatedAt: new Date(), // Tambahkan timestamp
    });

    alert('Perubahan berhasil disimpan!');
    router.push('/adm/home'); // Arahkan kembali ke halaman utama
  } catch (error) {
    console.error('Error updating mainan data:', error);
    alert('Gagal menyimpan perubahan. Silakan coba lagi.');
  } finally {
    isSubmitting.value = false;
  }
};

// Fungsi untuk mereset form
const resetForm = () => {
  form.value = {
    nama: '',
    deskripsi: '',
  };
};
</script>

<style>
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