<template>
  <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
    <div class="card-body">
      <slot name="content" />

      <div class="form-control mt-6">
        <slot name="button-group" />
      </div>
    </div>
  </div>
</template>
