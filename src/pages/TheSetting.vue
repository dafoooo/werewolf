<script setup lang="ts"></script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-2xl font-bold uppercase">Xây một ngôi làng mới</h1>
        <p class="py-6">
          Đặt cho ngôi làng một cái tên thật kêu, một cái mật khẩu thật loằng ngoằng để không có kẻ
          gian đột nhập.
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
            <RouterLink class="btn btn-primary px-10 py-2" to="/deck">Tiếp</RouterLink>
            <RouterLink to="/" class="btn btn-link text-sm text-secondary"> Thôi </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
