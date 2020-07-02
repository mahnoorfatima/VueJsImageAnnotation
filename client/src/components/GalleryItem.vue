<template>
  <div class="card" @click="$router.push({name: 'detail', params: { item: image}})">
    <h4 class="card-title">{{image.title}}</h4>
    <div class="card-image">
      <img :src="image.v_image_url" class="img-responsive"/>
    </div> 
    <p class="card-description">{{image.description}}</p> 
     <vodal :show="show" animation="zoom" @hide="show = false">

      </vodal>
      </div>
</template>

<script>
import ImageModel from './Image.vue'

export default {
    data () {
    return {
      show: false
    }
  },
  props: ['image'],
   components: {
    'image-model': ImageModel
  },
  methods: {
    showAnnotationModal() {
      this.show = true
    }
  }
}
</script>

<style lang="scss">
.card {
  box-shadow: 0 2px 20px 0 rgba(87,87,87,0.33);
  border-radius: 7px;
  position: relative;
  .card-title {
    padding: 10px 15px;
    margin: 0;
  }
  .card-description {
    padding: 10px 15px;
    margin: 0;
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: 100%;
  }
  &:hover {
    box-shadow: 0 5px 20px 0 rgba(87,87,87,0.9);
  }
}
</style>
