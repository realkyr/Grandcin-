<template>
  <div>
    <b-carousel
      id="carousel"
      style="text-shadow: 1px 1px 2px #333;"
      controls
      background="#ababab"
      :interval="4000"
      img-width="1024"
      img-height="480"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        class="myImg"
        img-src="https://23.imgtrue.com/2019/02/21/download0e9a2f8f4f869eb8.jpg"
      />
      <b-carousel-slide
        class="myImg"
        img-src="https://23.imgtrue.com/2019/02/21/download0e9a2f8f4f869eb8.jpg"
      />
      <b-carousel-slide
        class="myImg"
        img-src="https://23.imgtrue.com/2019/02/21/download0e9a2f8f4f869eb8.jpg"
      />
      <b-carousel-slide
        class="myImg"
        img-src="https://23.imgtrue.com/2019/02/21/download0e9a2f8f4f869eb8.jpg"
      />
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>

<style>
.myImg {
  width: 100%;
  max-height: 320px !important;
}
</style>
