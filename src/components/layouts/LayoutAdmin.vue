<template>
  <div
    class="p-0 my-4 flex justify-between bg-gray-100 border rounded bg-opacity-40 border-gray-400"
  >
    <header class="w-2/12">
      <div class="flex justify-center items-center mt-2 mb-4">
        <div class="text-red-600 text-3xl">
          <i class="fa-solid fa-layer-group"></i>
        </div>
        <div class="text-2xl">Task</div>
        <div class="text-2xl text-blue-600 font-semibold text-center">
          Management
        </div>
      </div>
      <div class="text-center relative mt-12">
        <i
          class="fa-solid fa-magnifying-glass text-gray-600 text-xl absolute top-2 right-12"
        ></i>
        <input
          class="w-9/12 bg-gray-100 p-1 border rounded border-black bg-opacity-50"
          placeholder="Search here"
        />
      </div>
      <div class="mt-6 mb-2 mx-4 text-lg">
        <div
          class="font-semibold mx-3 px-4 py-2 border rounded-xl border-white hover:bg-blue-600 hover:border hover:rounded-xl hover:border-blue-800 hover:text-white"
        >
          <i class="fa-solid fa-border-all text-xl text-gray-400"></i> Dashboard
        </div>
      </div>
      <div class="mb-2 mx-4 text-lg">
        <div
          class="font-semibold mx-3 px-4 py-2 border rounded-xl border-white hover:bg-blue-600 hover:border hover:rounded-xl hover:border-blue-800 hover:text-white"
        >
          <i class="fa-solid fa-users text-xl text-gray-400"></i> Worker
        </div>
      </div>
      <div class="mb-2 mx-4 text-lg">
        <div
          class="font-semibold mx-3 px-4 py-2 border rounded-xl border-white hover:bg-blue-600 hover:border hover:rounded-xl hover:border-blue-800 hover:text-white"
        >
          <i class="fa-solid fa-triangle-exclamation text-xl text-gray-400"></i>
          Threats
        </div>
      </div>
      <div class="mb-2 mx-4 text-lg">
        <div
          class="font-semibold mx-3 px-4 py-2 border rounded-xl border-white hover:bg-blue-600 hover:border hover:rounded-xl hover:border-blue-800 hover:text-white"
        >
          <i class="fa-solid fa-briefcase text-xl text-gray-400"></i> My Tasks
        </div>
      </div>
      <div class="mb-2 mx-4 text-lg">
        <div
          class="font-semibold mx-3 px-4 py-2 border rounded-xl border-white hover:bg-blue-600 hover:border hover:rounded-xl hover:border-blue-800 hover:text-white"
        >
          <i class="fa-solid fa-award text-xl text-gray-400"></i>
          Awareness
        </div>
      </div>
      <div class="mb-2 mx-4 text-lg">
        <div
          class="font-semibold mx-3 px-4 py-2 border rounded-xl border-white hover:bg-blue-600 hover:border hover:rounded-xl hover:border-blue-800 hover:text-white"
        >
          <i class="fa-solid fa-bars-progress text-xl text-gray-400"></i>
          My Progress
        </div>
      </div>
      <div class="mb-2 mx-4 text-lg">
        <div
          class="font-semibold mx-3 px-4 py-2 border rounded-xl border-white hover:bg-blue-600 hover:border hover:rounded-xl hover:border-blue-800 hover:text-white"
        >
          <i class="fa-solid fa-border-top-left text-xl text-gray-400"></i>
          Banner
        </div>
      </div>
      <div class="mb-2 mx-4 text-lg">
        <div
          class="font-semibold mx-3 px-4 py-2 border rounded-xl border-white hover:bg-blue-600 hover:border hover:rounded-xl hover:border-blue-800 hover:text-white"
        >
          <i class="fa-solid fa-screwdriver-wrench text-xl text-gray-400"></i>
          Setting
        </div>
      </div>
    </header>
    <div class="w-10/12"><router-view /></div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
