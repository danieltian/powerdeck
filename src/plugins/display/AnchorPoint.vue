<template lang="pug" functional>
  .anchor-point(:position="props.position" :class="{ selected: props.selected == props.position }") {{ props.icon }}
</template>
