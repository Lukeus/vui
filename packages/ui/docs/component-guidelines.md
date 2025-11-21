# Component Guidelines

## Component API Reference

### Button

Interactive button component with multiple variants and states.

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean (default: false)
- `loading`: boolean (default: false)
- `type`: 'button' | 'submit' | 'reset' (default: 'button')

**Events:**

- `click`: Emitted when button is clicked (unless disabled or loading)

**Slots:**

- `default`: Button content

**Example:**

```vue
<Button variant="primary" size="lg" :loading="isLoading" @click="handleClick">
  Save Changes
</Button>
```

---

### Card

Flexible container component with elevation and interaction options.

**Props:**

- `variant`: 'outlined' | 'elevated' | 'filled' (default: 'outlined')
- `interactive`: boolean (default: false) - Adds hover effects

**Slots:**

- `default`: Card content

**Example:**

```vue
<Card variant="elevated" interactive>
  <h3>Product Card</h3>
  <p>Description goes here</p>
</Card>
```

---

### Alert

Display important messages with different severity levels.

**Props:**

- `variant`: 'info' | 'success' | 'warning' | 'danger' (default: 'info')
- `title`: string (required)
- `size`: 'sm' | 'md' (default: 'md')
- `dismissible`: boolean (default: false)

**Events:**

- `dismiss`: Emitted when alert is dismissed (if dismissible)

**Slots:**

- `default`: Alert message content

**Example:**

```vue
<Alert variant="success" title="Success" dismissible @dismiss="handleDismiss">
  Your profile has been updated.
</Alert>
```

---

### Badge

Small label for status, counts, or categories.

**Props:**

- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')

**Slots:**

- `default`: Badge content

**Example:**

```vue
<Badge variant="success" size="sm">Active</Badge>
<Badge variant="danger">99+</Badge>
```

---

### Input

Text input field with label and validation support.

**Props:**

- `modelValue`: string | number
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' (default: 'text')
- `label`: string
- `placeholder`: string
- `disabled`: boolean (default: false)
- `error`: string - Error message to display
- `required`: boolean (default: false)

**Events:**

- `update:modelValue`: Emitted when value changes

**Slots:**

- None

**Example:**

```vue
<Input v-model="email" type="email" label="Email Address" placeholder="you@example.com" :error="emailError" required />
```

---

### Table

Data table with sorting and styling.

**Props:**

- `columns`: Array<{ key: string; label: string; sortable?: boolean }>
- `data`: Array<Record<string, any>>
- `caption`: string (optional, for accessibility)

**Events:**

- `sort`: Emitted when column header is clicked (if sortable)

**Slots:**

- `cell(key)`: Custom cell rendering for specific column

**Example:**

```vue
<Table :columns="columns" :data="users" caption="User List" @sort="handleSort">
  <template #cell(actions)="{ row }">
    <Button size="sm" @click="editUser(row)">Edit</Button>
  </template>
</Table>
```

---

### CommandPalette

VS Code-style command palette for quick navigation.

**Props:**

- `open`: boolean (v-model) - Controls visibility
- `items`: Array<CommandPaletteItem>
- `recentItems`: Array<CommandPaletteItem>
- `groups`: Array<CommandPaletteGroup>
- `placeholder`: string (default: 'Type a command or search...')
- `emptyMessage`: string (default: 'No results found.')

**Types:**

```typescript
interface CommandPaletteItem {
  id: string
  label: string
  shortcut?: string
  icon?: unknown
  onSelect?: () => void
}

interface CommandPaletteGroup {
  label: string
  items: CommandPaletteItem[]
}
```

**Events:**

- `update:open`: Emitted when dialog is opened/closed
- `select`: Emitted when item is selected

**Slots:**

- None

**Example:**

```vue
<CommandPalette v-model:open="isOpen" :items="commands" :recent-items="recentCommands" @select="executeCommand" />
```

---

### Skeleton

Loading placeholder with multiple variants.

**Props:**

- `variant`: 'text' | 'card' | 'avatar' | 'button' | 'circle' | 'rectangle' (default: 'text')
- `lines`: number (default: 1, for text variant)
- `width`: string (CSS width)
- `height`: string (CSS height)
- `animate`: boolean (default: true)

**Slots:**

- None

**Example:**

```vue
<Skeleton variant="text" :lines="3" />
<Skeleton variant="avatar" />
<Skeleton variant="card" :animate="false" />
```

---

### Tooltip

Contextual information on hover.

**Props:**

- `content`: string - Tooltip text
- `placement`: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
- `delay`: number (default: 200, in milliseconds)
- `disabled`: boolean (default: false)

**Slots:**

- `default`: Trigger element
- `content`: Custom tooltip content (overrides content prop)

**Example:**

```vue
<Tooltip content="Save your changes" placement="top">
  <Button>💾</Button>
</Tooltip>

<Tooltip placement="bottom">
  <Button>Help</Button>
  <template #content>
    <div>
      <strong>Need assistance?</strong>
      <p>Contact support for help</p>
    </div>
  </template>
</Tooltip>
```

---

### Navbar

Responsive navigation bar.

**Props:**

- None (uses slots for flexibility)

**Slots:**

- `default`: Navbar content

**Example:**

```vue
<Navbar>
  <div class="flex items-center justify-between">
    <Logo />
    <nav class="flex gap-4">
      <Button variant="ghost">Home</Button>
      <Button variant="ghost">About</Button>
      <Button variant="primary">Sign In</Button>
    </nav>
  </div>
</Navbar>
```

---

## Component Composition

Components are designed to work together:

```vue
<Card variant="elevated">
  <div class="flex items-center gap-4 mb-4">
    <Skeleton v-if="loading" variant="avatar" />
    <img v-else :src="user.avatar" alt="" class="w-12 h-12 rounded-full" />
    
    <div class="flex-1">
      <Skeleton v-if="loading" variant="text" :lines="2" />
      <template v-else>
        <h3 class="font-semibold">{{ user.name }}</h3>
        <p class="text-sm text-zinc-500">{{ user.email }}</p>
      </template>
    </div>
    
    <Badge v-if="!loading" :variant="user.status === 'active' ? 'success' : 'secondary'">
      {{ user.status }}
    </Badge>
  </div>
  
  <Alert v-if="error" variant="danger" title="Error" dismissible @dismiss="error = null">
    {{ error }}
  </Alert>
  
  <div class="flex gap-2">
    <Button variant="primary" :loading="saving" @click="saveUser">
      Save
    </Button>
    <Tooltip content="This action cannot be undone">
      <Button variant="danger" @click="deleteUser">
        Delete
      </Button>
    </Tooltip>
  </div>
</Card>
```

## Best Practices

### 1. Use Semantic Variants

Choose variants based on semantic meaning:

```vue
<!-- Good -->
<Button variant="danger" @click="deleteAccount">Delete Account</Button>
<Alert variant="success" title="Success">Account created</Alert>

<!-- Avoid -->
<Button variant="primary" class="!bg-red-500">Delete Account</Button>
```

### 2. Loading States

Always provide feedback during async operations:

```vue
<script setup lang="ts">
const loading = ref(false)

async function loadData() {
  loading.value = true
  try {
    await fetchData()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="loading">
    <Skeleton variant="card" />
  </div>
  <Card v-else>
    <!-- Content -->
  </Card>
</template>
```

### 3. Error Handling

Display errors clearly:

```vue
<Alert v-if="error" variant="danger" title="Error" dismissible @dismiss="error = null">
  {{ error }}
</Alert>
```

### 4. Accessibility

Use proper labels and ARIA attributes:

```vue
<Input v-model="username" label="Username" required aria-describedby="username-hint" />
<p id="username-hint" class="text-sm text-zinc-500">
  Choose a unique username
</p>
```

### 5. Responsive Design

Test components at different screen sizes:

```vue
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card v-for="item in items" :key="item.id">
    <!-- Content -->
  </Card>
</div>
```

## Common Patterns

### Confirmation Dialog

```vue
<script setup lang="ts">
const showConfirm = ref(false)

function handleDelete() {
  showConfirm.value = true
}

function confirmDelete() {
  // Perform deletion
  showConfirm.value = false
}
</script>

<template>
  <Button variant="danger" @click="handleDelete">Delete</Button>

  <Dialog v-model:open="showConfirm">
    <Alert variant="warning" title="Confirm Deletion"> Are you sure? This action cannot be undone. </Alert>
    <div class="mt-4 flex gap-2">
      <Button variant="danger" @click="confirmDelete">Delete</Button>
      <Button variant="outline" @click="showConfirm = false">Cancel</Button>
    </div>
  </Dialog>
</template>
```

### Form Validation

```vue
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

function validate() {
  try {
    schema.parse(form)
    return true
  } catch (e) {
    if (e instanceof z.ZodError) {
      e.errors.forEach((err) => {
        errors[err.path[0]] = err.message
      })
    }
    return false
  }
}
</script>

<template>
  <form @submit.prevent="validate() && handleSubmit()">
    <Input v-model="form.email" label="Email" :error="errors.email" />
    <Input v-model="form.password" type="password" label="Password" :error="errors.password" />
    <Button type="submit">Submit</Button>
  </form>
</template>
```
