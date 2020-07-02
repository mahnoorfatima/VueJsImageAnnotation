<template>
<div class="annotation_container">
	      <h3 class="text-center">Save Annotations to Database <button class="btn btn-info" @click="handleSubmit"><span class="glyphicon glyphicon-save"></span></button></h3>
<div >
<annotatable :annotations.sync="annotations"  input="input-menu" >
	<slot>Drag to draw box</slot>
     <img class="thumbnail" :src="item.v_image_url" id="capture"/>

</annotatable>
</div>
</div>
</template>

<script>
import Annotatable from './Annotatable.vue'
import html2canvas from 'html2canvas';
import axios from 'axios';
export default {
      data () {
    return {
      annotations: [
				{
					id: '12345678',
					x: 285,
					y: 54,
					width: 112,
					height: 188,
					label: 'default',
					status: 'labeled'
				}
			]
    }
  },
  props: ['item'],
       components: {
    'annotatable': Annotatable
  },
  methods: {
	downloadImage() {
		console.log('---------download---------');
		console.log('---------document.querySelector("#capture")---------', document.querySelector("#capture"));
		html2canvas(document.querySelector("#capture"))
		.then(canvas => {
			console.log('---------canvas---------', canvas);
		  document.body.appendChild(canvas)
		  var link = document.createElement('a');
        if (typeof link.download === 'string') {
          link.href = canvas.toDataURL();
          link.download = 'canvas.png';

          //Firefox requires the link to be in the body
          document.body.appendChild(link);

          //simulate click
          link.click();

          //remove the link when done
          document.body.removeChild(link);
        } else {
          window.open(canvas.toDataURL());
        }
      }).catch((error) => {
        console.log("Erorr", error)
      });
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