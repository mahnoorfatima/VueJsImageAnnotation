<template id="annotatable-template">
	<div class="annotatable" v-on:mousedown="beginDraw" v-on:mousemove="drawing" v-on:mouseup="drawn">
		<spinner v-show="spin" :size="50"></spinner>
		<slot></slot>
		<annotation v-for="annotation in annotations" :key="annotation.id" :props="annotation" :input="input" @labeled="labeledUpdate" @remove="remove" @toEdit="toEdit">
		</annotation>
		<outline v-if="newAnnotationDrawing" :props="newAnnotation"></outline>
	</div>
</template>

<script>
import Annotation from './Annotation.vue'
import Outline from './Outline.vue'
import Spinner from 'vue-spinner-component/src/Spinner.vue';
import {randomId} from './utils'
import axios from 'axios';

export default {
	props: {
		annotations: {},
		options: {},
		input: {default: 'input-text'}
	},
	data: function() {
		return {
			newAnnotation: null,
			newAnnotationDrawing: false,
			lock: false,
			position: null,
			spin: false
		}
	},
	methods: {
		beginDraw: function(e) {
			if (this.lock) return;
			this.newAnnotationDrawing = true;
			this.position = e.currentTarget.getBoundingClientRect();
			this.newAnnotation = {
				x: e.clientX - this.position.left, y: e.clientY - this.position.top, width:1, height:1,
				status:'new',
				label: '',
				id: randomId()
			};
		},
		drawing: function(e) {
			if (!this.newAnnotationDrawing) return;
			this.newAnnotation.width = e.clientX - this.newAnnotation.x - this.position.left;
			this.newAnnotation.height = e.clientY - this.newAnnotation.y - this.position.top;
		},
		drawn: function() {
			if (this.lock) return;
			if(this.newAnnotation.width<3 || this.newAnnotation.height<3) {
				this.newAnnotationDrawing = false;
				return;
			}
			this.annotations.push(this.newAnnotation);
			this.newAnnotationDrawing = false;
			this.newAnnotation = null;
			this.lock = true;
		},
		labeledUpdate: function(msg) {
			let updatedAnnotation;
			this.lock = false;
			if (!msg) return;
			for (var i = 0; i < this.annotations.length; i++) {
				if (this.annotations[i].id == msg.id) {
					this.annotations[i].label = msg.label;
					this.annotations[i].status = 'labeled';
					updatedAnnotation = this.annotations[i];
				}
			}
			if(updatedAnnotation.imageId){
				this.updateItem(updatedAnnotation)
			}
		},
		remove: function(msg) {
			let item;
			this.annotations = this.annotations.filter(function(annotation){
				if(annotation.id == msg.id) {
					item = annotation	
				}
				return annotation.id != msg.id;
			});
			if(item.imageId){
				this.deleteItem(item);
			}
			this.lock = false;
		},
		toEdit: function(msg) {
			for (var i = 0; i < this.annotations.length; i++) {
				if (this.annotations[i].id == msg.id) {
					this.annotations[i].status = 'edit';
				}
			}
		},
		deleteItem: function(item) {
		this.spin = true;
		const config = {
			headers: {
			"Content-Type": "application/json",
				"Accept": "application/json",
				"type": "formData"
			}
		};
		axios.post('https://webapplication-282411.el.r.appspot.com/delete-annotation', {item: item}, config)
			.then(() => {
				this.spin = false
			});
			},
		updateItem: function(item) {
		this.spin = true;
		const config = {
			headers: {
			"Content-Type": "application/json",
				"Accept": "application/json",
				"type": "formData"
			}
			
		}
			axios.post('https://webapplication-282411.el.r.appspot.com/update-annotation', {item: item}, config)
			.then(() => {
				this.spin = false
			})
			}
	},
	components: { Annotation, Outline, Spinner }
};
</script>

<style>
.annotatable {
	cursor: crosshair;
	position: relative;
}
</style>
