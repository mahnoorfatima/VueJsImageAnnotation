<template>
  <div class="card" @click="$router.push({name: 'image-details', params: { item: image}})">
    <h4 class="card-title">{{image.title}}</h4>
    <div class="card-image">
      <img :src="image.v_image_url" class="img-responsive"/>
    </div> 
    <p class="card-description">{{image.description}}</p> 
      </div>
</template>

<script>

export default {
    data () {
    return {
      show: false
    }
  },
  props: ['image'],
   components: {
  },
  methods: {
    showAnnotationModal() {
      this.show = true
    }
  },
    created() {
      if(this.image.image_annotations){
        this.image.image_annotations = this.image.image_annotations.filter(function(item){
          return item.i_is_archived != 1;
        })
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
