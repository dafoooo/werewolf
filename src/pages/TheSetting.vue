<script setup lang="ts">
import PrimaryButton from '../components/atoms/PrimaryButton.vue'
import TextButton from '../components/atoms/TextButton.vue'
</script>

<template>
  <div class="text-center lg:text-left">
    <h1 class="text-2xl font-bold uppercase">Xây một ngôi làng mới</h1>
    <p class="py-6">
      Đặt cho ngôi làng một cái tên thật kêu, một cái mật khẩu thật loằng ngoằng để không có kẻ gian
      đột nhập.
    </p>
  </div>
  <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
    <div class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Tên làng</span>
        </label>
        <input type="text" placeholder="Vũ Đại" class="input input-bordered" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Mật khẩu vào làng</span>
        </label>
        <input type="text" placeholder="Pa5sW0rd!" class="input input-bordered" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Thời gian cãi nhau (Tuỳ)</span>
        </label>
        <input type="text" placeholder="5:00" class="input input-bordered" />
      </div>

      <div class="form-control mt-6">
        <PrimaryButton to="/deck" text="Tiếp" />
        <TextButton to="/" text="Thôi" />
      </div>
    </div>
  </div>
</template>
