<template>
    <div class="container">
      <h3 class="text-center">Image Gallery <button class="btn btn-info" @click="showModal"><span class="glyphicon glyphicon-upload"></span></button></h3>
      <vodal :show="show" animation="zoom" @hide="show = false">
        <upload @submit="handleSubmit"></upload>
      </vodal>
      <gallery-list :images="images"></gallery-list>
          <span v-show="spin" class="glyphicon glyphicon-repeat fast-right-spinner"></span>
    </div>
</template>


<script>
import Upload from './Upload.vue';
import GalleryList from './GalleryList.vue';
import axios from 'axios';
export default {
  name: 'app',
  data () {
    return {
      images: [],
      show: false,
      cl: null,
      spin: false
    }
  },
   created() {
    this.spin = true;
    axios.get('http://localhost:3000/')
      .then(({data}) => {    
        this.spin = false
        this.images = data.map(image => {
          return image;
        });
      })
  },
  
   methods: {
    showModal() {
      this.show = true
    },
    handleSubmit(model) {
      this.show = false;
      this.spin = true
      const formData = new FormData()
      formData.append('file', model.imageFile);
      formData.append('title', model.title);
      formData.append('description', model.description);
       const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "type": "formData"
        }
    }
      axios.post('http://localhost:3000/upload', formData, config)
      .then(({data}) => {
        this.spin = false
      })
    }
  },
   components: {
    'gallery-list': GalleryList,
    'upload': Upload
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
