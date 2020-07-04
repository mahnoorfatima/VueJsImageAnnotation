<template>
<div class="annotation_container">
	<h3 class="text-center">Save Annotations to Database <button class="btn btn-info" @click="handleSubmit"><span class="glyphicon glyphicon-save"></span></button></h3>
   <annotatable :annotations.sync="annotations"  input="input-menu" >
	    <slot>Drag to draw box</slot>
         <img class="thumbnail" :src="item.v_image_url" id="capture"/>
     </annotatable>
</div>
</template>

<script>
import Annotatable from './Annotatable.vue'
import html2canvas from 'html2canvas';
import axios from 'axios';
export default {
      data () {
    return {
      annotations: this.item.image_annotations,
      spin: true
    }
  },
  props: ['item'],
       components: {
    'annotatable': Annotatable
  },
  methods: {
	downloadImage() {
	},
	handleSubmit() {
       const config = {
        headers: {
           "Content-Type": "application/json",
            "Accept": "application/json",
            "type": "formData"
        }
	}
      axios.post('http://localhost:3000/save-annotations', {id: this.item.id, annotations: this.annotations }, config)
      .then(({data}) => {
        this.spin = false
      })
    }
  }
}

</script>
<style lang="scss">
  @media (min-width: 1200px) {
    .annotation_container {
        width: 1000px !important;
    }
}
    @media (min-width: 992px) {
    .annotation_container {
        width: 1000px !important;
    }
}
    @media (min-width: 768px) {
    .annotation_container {
         width: 1000px !important;
    }
}


.annotation_container{ width: 1000px !important;}
.thumbnail{ width: 1000px !important;}
</style>