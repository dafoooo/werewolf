<script setup lang="ts">
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'

onMounted(() => {
  themeChange(false)
})
</script>

<template>
  <main>
    <div class="hero min-h-screen w-screen bg-base-200">
      <div class="hero-content w-full flex-col">
        <slot />
      </div>
    </div>
  </main>

  <label
    for="my-modal-6"
    class="btn btn-primary modal-button fixed top-2 right-0 hover:-translate-x-2 translate-x-20 z-10">
    <svg
      class="fill-current mr-4"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 512 512">
      <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
    </svg>
    Setting
  </label>

  <input type="checkbox" id="my-modal-6" class="modal-toggle" />
  <label for="my-modal-6" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Làm màu không bạn</h3>
      <div class="py-4 form-control">
        <select class="select w-full" data-choose-theme>
          <option value="">Chọn theme</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="cupcake">Cupcake</option>
          <option value="bumblebee">Bumblebee</option>
          <option value="emerald">Emerald</option>
          <option value="corporate">Corporate</option>
          <option value="synthwave">Synthwave</option>
          <option value="retro">Retro</option>
          <option value="cyberpunk">Cyberpunk</option>
          <option value="valentine">Valentine</option>
          <option value="halloween">Halloween</option>
          <option value="garden">Garden</option>
          <option value="forest">Forest</option>
          <option value="aqua">Aqua</option>
          <option value="lofi">Lofi</option>
          <option value="pastel">Pastel</option>
          <option value="fantasy">Fantasy</option>
          <option value="wireframe">Wireframe</option>
          <option value="black">Black</option>
          <option value="luxury">Luxury</option>
          <option value="dracula">Dracula</option>
          <option value="cmyk">Cmyk</option>
          <option value="autumn">Autumn</option>
          <option value="business">Business</option>
          <option value="acid">Acid</option>
          <option value="lemonade">Lemonade</option>
          <option value="night">Night</option>
          <option value="coffee">Coffee</option>
          <option value="winter">Winter</option>
        </select>
      </div>
    </div>
  </label>
</template>
