<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Keola Mainan</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <div class="crud-container">
        <!-- Add New Mainan Button -->
        <div class="header-actions">
          <ion-button expand="block" @click="() => router.push('/adm/home/addform')">
            <ion-icon slot="start" :icon="add"></ion-icon>
            Add New Mainan
          </ion-button>
        </div>

        <!-- Search and Filter Section -->
        <div class="search-filter-container">
          <!-- Search Bar -->
          <div class="search-bar">
            <ion-searchbar
              v-model="searchQuery"
              debounce="500"
              placeholder="Search mainan..."
            ></ion-searchbar>
          </div>

          <!-- Filter Icon -->
          <div class="filter-icon">
            <ion-icon :icon="filter" @click="toggleFilterMenu"></ion-icon>
          </div>
        </div>

        <!-- Filter and Sort Options -->
        <div v-if="isFilterMenuVisible" class="filter-sort">
          <ion-item>
            <ion-label>Sort By</ion-label>
            <ion-select v-model="sortOption" @ionChange="sortMainan">
              <ion-select-option value="name">Nama</ion-select-option>
              <ion-select-option value="description">Deskripsi</ion-select-option>
            </ion-select>
          </ion-item>
        </div>

        <!-- Mainan Table -->
        <div class="table-container">
          <ion-list>
            <!-- Table Header -->
            <ion-item class="table-header">
              <ion-label class="table-column">Nama Mainan</ion-label>
              <ion-label class="table-column">Deskripsi</ion-label>
              <ion-label class="table-column">Actions</ion-label>
            </ion-item>

            <!-- Table Rows -->
            <ion-item v-for="mainan in paginatedMainan" :key="mainan.id">
              <ion-label>
                <h2>{{ mainan.nama }}</h2>
                <p>{{ mainan.keterangan }}</p>
              </ion-label>
              <ion-button
                color="primary"
                fill="outline"
                @click="editMainan(mainan.id)"
              >
                <ion-icon slot="icon-only" :icon="create"></ion-icon>
              </ion-button>
              <ion-button
                color="danger"
                fill="outline"
                @click="deleteMainan(mainan.id)"
              >
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-button>
            </ion-item>
          </ion-list>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <ion-button :disabled="currentPage === 1" @click="previousPage">
            Previous
          </ion-button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <ion-button :disabled="currentPage === totalPages" @click="nextPage">
            Next
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { trash, create, filter, add } from 'ionicons/icons';

// Router
const router = useRouter();

// Reactive Variables
const mainanList = ref([]); // Semua data mainan
const searchQuery = ref(''); // Query pencarian
const sortOption = ref('nama'); // Opsi sorting
const itemsPerPage = 3; // Jumlah item per halaman
const currentPage = ref(1); // Halaman saat ini
const isFilterMenuVisible = ref(false); // Filter menu toggle

// Fetch Data from Firestore
const fetchMainan = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'mainan'));
    mainanList.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      nama: doc.data().nama || 'Unnamed Mainan',
      keterangan: doc.data().keterangan || 'No Description',
    }));
  } catch (error) {
    console.error('Error fetching mainan:', error);
  }
};

onMounted(() => {
  fetchMainan();
});

// Filter and Sort Logic
const filteredMainan = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  return mainanList.value.filter(
    (mainan) =>
      mainan.nama.toLowerCase().includes(searchLower) ||
      mainan.keterangan.toLowerCase().includes(searchLower)
  );
});

const sortMainan = () => {
  if (sortOption.value === 'nama') {
    filteredMainan.value.sort((a, b) => a.nama.localeCompare(b.nama));
  } else if (sortOption.value === 'keterangan') {
    filteredMainan.value.sort((a, b) => a.keterangan.localeCompare(b.keterangan));
  }
};

// Pagination Logic
const totalPages = computed(() => Math.ceil(filteredMainan.value.length / itemsPerPage));

const paginatedMainan = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredMainan.value.slice(start, end);
});

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Actions
const toggleFilterMenu = () => {
  isFilterMenuVisible.value = !isFilterMenuVisible.value;
};

const editMainan = (mainan) => {
  router.push({ name: 'editform', params: { id: mainan.id } });
};

const deleteMainan = async (id) => {
  try {
    await deleteDoc(doc(db, 'mainan', id));
    alert('Mainan berhasil dihapus.');
    fetchMainan(); // Refresh data
  } catch (error) {
    alert('Gagal menghapus data mainan.');
    console.error('Error deleting mainan:', error);
  }
};
</script>


<style scoped>
ion-content {
  --background: #f9fafc;
}

.crud-container {
  padding: 20px;
}

.header-actions {
  margin-bottom: 20px;
  text-align: center;
}

.search-filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-bar {
  flex: 8;
}

.filter-icon {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-container {
  padding: 10px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.table-header {
  font-weight: bold;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination span {
  margin: 0 15px;
}
</style>
