<script setup lang="ts"></script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Ma Sói</h1>
        <small class="text-sm">v1.0</small>
        <p class="py-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur veniam molestias cum
          rem nulla sunt odit veritatis.
        </p>

        <RouterLink to="/setting" class="btn btn-primary px-10 py-2"> Chơi luôn </RouterLink>
        <br />
        <RouterLink to="/resume" class="btn btn-link text-sm text-secondary">
          Chơi tiếp
        </RouterLink>
      </div>
    </div>
  </div>
</template>
