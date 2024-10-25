<template>
    <div id="app" class="max-w-2xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Todo List</h1>
        <div class="mb-4">
            <input v-model="newTodo.title" placeholder="Title" class="border border-gray-300 rounded p-2 w-full" />
        </div>
        <div class="mb-4">
            <textarea v-model="newTodo.description" placeholder="Description"
                class="border border-gray-300 rounded p-2 w-full resize-none" rows="4" maxlength="250"></textarea>
            <div class="text-sm text-gray-500 mt-1">
                {{ 250 - newTodo.description.length }}
            </div>
        </div>
        <button @click="addUpdateTodo" class="btn w-full py-2 rounded text-white"
            :class="newTodo.new ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'">
            {{ newTodo.new ? 'Add' : 'Update' }}
        </button>
        <div class="my-4">
            <input v-model="searchQuery" placeholder="Search Todo Title Or Description..."
                class="border border-gray-300 rounded p-2 w-full" />
        </div>
        <div class="mt-6">
            <div class="bg-gray-100 rounded-lg shadow-md">
                <div class="flex bg-gray-200 p-2 rounded-t-lg">
                    <div class="flex-1 font-semibold">Title</div>
                    <div class="flex-1 font-semibold">Description</div>
                    <div class="flex-1 font-semibold">Actions</div>
                </div>
                <div class="divide-y">
                    <div class="flex p-2" v-for="todo in todos" :key="todo.id">
                        <div class="flex-1">{{ todo.title }}</div>
                        <div class="flex-1">{{ todo.description }}</div>
                        <div class="flex-1 space-x-2">
                            <button class="btn bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600"
                                @click="setUpdateTodo(todo.id, todo.title, todo.description)">Update</button>
                            <button class="btn bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
                                @click="removeTodo(todo.id)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { getAllTodos, createTodo, deleteTodo, updateTodo, searchTodo } from '../services/todoService';

export default defineComponent({
    setup() {
        const todos = ref([]);
        const newTodo = ref({
            id: 0, title: '', description: '', new: true
        });
        const searchQuery = ref('');

        const fetchTodos = async () => {
            todos.value = await getAllTodos();
        };

        // Watch for changes in searchQuery and fetch filtered todos from the backend
        watch(searchQuery, async (newQuery) => {
            if (newQuery) {
                todos.value = await searchTodo(newQuery.toLowerCase());
            } else {
                await fetchTodos(); // Fetch all todos if search query is empty
            }
        });

        const setUpdateTodo = async (id, title, description) => {
            newTodo.value.title = title;
            newTodo.value.description = description;
            newTodo.value.new = false;
            newTodo.value.id = id;
        };

        const addUpdateTodo = async () => {
            if (newTodo.value.title && newTodo.value.description && newTodo.value.new) {
                await createTodo(newTodo.value.title, newTodo.value.description);
                newTodo.value.title = '';
                newTodo.value.description = '';
                await fetchTodos();
            } else if (newTodo.value.title && newTodo.value.description && !newTodo.value.new && newTodo.value.id != 0) {
                await updateTodo(newTodo.value.id, newTodo.value.title, newTodo.value.description);
                newTodo.value.title = '';
                newTodo.value.description = '';
                newTodo.value.new = true;
                newTodo.value.id = 0;
                await fetchTodos();
            }
        };

        const removeTodo = async (id) => {
            await deleteTodo(id);
            await fetchTodos();
        };

        onMounted(fetchTodos);

        return {
            todos,
            newTodo,
            addUpdateTodo,
            removeTodo,
            setUpdateTodo,
            searchQuery,
        };
    },
});
</script>