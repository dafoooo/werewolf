<script setup lang="ts">
import roles from '../data/roles.json'
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-2xl font-bold uppercase">Pick a card, any card</h1>
        <p class="py-6">
          Sử dụng kinh nghiệm 200 năm cân bằng game <br />
          để bốc một bộ bài thật công bằng cho cả sói và dân.
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control" v-for="role in roles">
            <label class="input-group">
              <span class="text-xs w-36 leading-6 pr-4">{{ role.name }}</span>
              <input type="text" placeholder="-" class="input w-full input-bordered" />
            </label>
          </div>
          <div class="form-control mt-6">
            <RouterLink class="btn btn-primary px-10 py-2" to="/deck">Tiếp</RouterLink>
            <RouterLink to="/" class="btn btn-link text-sm text-secondary"> Lại </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
