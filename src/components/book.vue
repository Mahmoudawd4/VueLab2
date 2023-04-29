<template>
  <div id="main">
    <nav
      class="nav d-flex justify-content-between align-items-baseline bg-warning-subtle px-4 py-2"
    >
      <a
        href="#"
        style="text-decoration: none; color: darkcyan"
        @click.prevent="toggleWishlistVisibility"
        >BOOK
      </a>
      <div class="d-flex justify-content-end align-items-baseline">
        <p class="text-light m-0 me-3">
          <b style="color: darkcyan; font-size: 1.5rem">{{
            wishlist.length
          }}</b>
          <span style="color: cornflowerblue"
            >items &nbsp; | &nbsp; Total Price:
          </span>
          <b style="color: darkcyan; font-size: 1.2rem">{{
            formatCurrency(getTotalPrice())
          }}</b>
        </p>
        <button class="btn btn-info" @click="toggleWishlistVisibility">
          show Wishlist
        </button>
      </div>
    </nav>

    <div class="container">
      <div
        class="d-flex justify-content-center flex-wrap gap-5 my-4"
        v-if="!wishlistVisible"
      >
        <div class="card mt-4" style="width: 20rem" v-for="book in books" v-bind:key="book.id">
          <img class="card-img-top" :src="book.img" alt="book.name" />
          <div class="card-body">
            <h5 class="card-title text-center text-info">
              BOOK NAME: {{ book.title }}
            </h5>
            <div class="table-responsive">
              <table class="table">
                <tbody>
                  <tr>
                    <td>category : {{ book.category }}</td>
                    <td>Author :{{ book.author }}</td>
                  </tr>
                  <tr>
                    <td :class="[book.pages < 50 ? 'less' : 'more']">
                      pages : {{ book.pages }}
                    </td>
                    <td>PRICE : {{ formatCurrency(book.price) }}</td>
                  </tr>
                  <tr>
                    <td>isbn : {{ book.isbn }}</td>
                    <td>
                      <button
                        class="btn btn-success"
                        :disabled="book.stock == 0"
                        @click="addToWishlist(book)"
                      >
                        AddToList
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-if="wishlistVisible" class="mt-4">
        <h1 v-if="wishlist.length == 0" class="text-primary text-center">
          Wishlist is empty
        </h1>

        <div v-else class="table-responsive bg-light">
          <table class="table">
            <thead>
              <th>ISBN</th>
              <th>Name</th>
              <th>Category</th>
              <th>Pages</th>
              <th>Author</th>
              <th>Price</th>
              <th>Operations</th>
            </thead>
            <tbody>
              // eslint-disable-next-line vue/require-v-for-key
              <tr v-for="item in wishlist" v-bind:key="item.id">
                <td>{{ item.isbn }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.pages }}</td>
                <td>{{ item.author }}</td>
                <td>{{ formatCurrency(item.price) }}</td>
                <td>
                  <button
                    class="btn btn-danger"
                    @click="removeFromWishlist(item)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colspan="5" class="text-center">Total price</th>
                <th colspan="2" class="text-primary">
                  {{ formatCurrency(getTotalPrice()) }}
                </th>
              </tr>
              <tr>
                <th colspan="5" class="text-center">Total taxes</th>
                <th colspan="2" class="text-primary">
                  {{ formatCurrency(calculateTaxes()) }}
                </th>
              </tr>
              <tr>
                <th colspan="5" class="text-center">Total price</th>
                <th colspan="2" class="text-primary">
                  {{ formatCurrency(getTotalPrice() + calculateTaxes()) }}
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import books from "../book.js";


export default {
  data: () => ({
    books,
    wishlist: [],
    wishlistVisible: false,
  }),

  

  methods: {
    
   
    
    formatCurrency(price) {
  const formattedPrice = new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);

  return formattedPrice;
},
    toggleWishlistVisibility() {
      this.wishlistVisible = !this.wishlistVisible;
    },
    addToWishlist: function (book) {
      book.stock--;
      this.wishlist.push(book);
    },
    removeFromWishlist(book) {
      book.stock++;
      const index = this.wishlist.indexOf(book);
      if (index > -1) {
        this.wishlist.splice(index, 1);
      }
    },
    getTotalPrice: function () {
      let totalPrice = 0;
     for (let item of this.wishlist) {
  totalPrice += item.price;
}

      return totalPrice;
    },
    calculateTaxes: function () {
      let taxes = 0;
     for (let item of this.wishlist) {
  taxes += item.price * 0.14;
}
      return taxes;
    },
  },
};
</script>

<style scoped></style>
