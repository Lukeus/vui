<script setup lang="ts">
import { Badge, Button, Heading, Input, Text } from '@vue-ui/ui'
import { ref } from 'vue'
import BadgePlayground from './BadgePlayground.vue'
import ButtonPlayground from './ButtonPlayground.vue'
import InputPlayground from './InputPlayground.vue'

const name = ref('')
</script>

<template>
  <div class="min-h-full p-8 dark:bg-zinc-900">
    <div class="mx-auto max-w-4xl space-y-12">
      <!-- Header -->
      <div class="space-y-4">
        <Heading :level="1">Vue UI Component Library</Heading>
        <Text>VS Code-inspired demo showcasing 42+ production-ready components</Text>
      </div>

      <!-- Buttons Section -->
      <section id="button" class="space-y-6">
        <Heading :level="2">Buttons</Heading>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button color="indigo">Indigo</Button>
            <Button color="blue">Blue</Button>
            <Button color="green">Green</Button>
            <Button color="red">Red</Button>
          </div>
          <div class="flex flex-wrap gap-3">
            <Button outline>Outline</Button>
            <Button plain>Plain</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
        <ButtonPlayground />
      </section>

      <!-- Inputs Section -->
      <section id="input" class="space-y-6">
        <Heading :level="2">Inputs</Heading>
        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium text-zinc-950 dark:text-white"> Name </label>
            <Input v-model="name" placeholder="Enter your name" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-zinc-950 dark:text-white"> Email </label>
            <Input type="email" placeholder="you@example.com" />
          </div>
        </div>
        <InputPlayground />
      </section>

      <!-- Badges Section -->
      <section id="badge" class="space-y-6">
        <Heading :level="2">Badges</Heading>
        <div class="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge color="blue">Blue</Badge>
          <Badge color="green">Green</Badge>
          <Badge color="yellow">Yellow</Badge>
          <Badge color="red">Red</Badge>
        </div>
        <BadgePlayground />
      </section>

      <!-- Interactive Example -->
      <section class="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-800/50">
        <Heading :level="2" class="mb-4">Interactive Demo</Heading>
        <Text class="mb-4">Try entering your name above:</Text>
        <div v-if="name" class="space-y-2">
          <Text>Hello, <Badge color="blue">{{ name }}</Badge>! 👋</Text>
          <Button color="indigo" @click="name = ''">Clear Name</Button>
        </div>
        <Text v-else class="text-zinc-400">Enter your name to see a personalized greeting.</Text>
      </section>

      <!-- Footer -->
      <footer class="border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
        <Text>Built with Vue 3 · TypeScript · Tailwind CSS 4 · @headlessui/vue</Text>
      </footer>
    </div>
  </div>
</template>
