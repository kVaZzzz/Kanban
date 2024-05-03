Vue.component('task-form', {
    props: [],
    template: `
    <div class="content_form">
        <form @submit.prevent="addTask">
            <label for="task-name">Создайте новую задачу:</label>
            <input class="input" id="task-name" type="text" v-model="taskName"><br><br>
            <label for="task-desc">Описание задачи:</label>
            <textarea id="task-desc" v-model="description"></textarea><br><br>
            <label for="deadline">Срок сдачи:</label>
            <input type="date" id="deadline" v-model="deadline" name="deadline-task" min="2024-01-01" max="2025-12-31" required />
            <button type="submit">Создать</button>
        </form>
    </div>
    `,
    data() {
        return {
            taskName: '',
            description: '',
            deadline: ''
        };
    },
    methods: {
        addTask() {
            if (this.taskName !== '') {
                const newTask = {
                    title: this.taskName,
                    description: this.description,
                    deadline: this.deadline,
                    reason: ''
                };
                newTask.createdDate = new Date().toLocaleDateString();
                this.$emit('add', newTask);
                this.taskName = '';
                this.description = '';
                this.deadline = '';
            } else {
                alert("Введите название задачи");
            }
        }
    }
});

Vue.component('task', {
    props: ['task', 'type'],
    data() {
        return {
            editingDescription: false,
            editedDescription: '',
            returnReason: ''
        };
    },
    methods: {
        handleEditDescription() {
            if (this.editingDescription) {
                this.task.description = this.editedDescription;
                this.task.lastEdited = new Date().toLocaleString();
            }
            this.editingDescription = !this.editingDescription;
        },
        handleDeleteTask() {
            this.$emit('delete', this.task);
        },
        handleMoveTask() {
            if (this.type === 'plan') {
                this.$emit('move', this.task);
            } else if (this.type === 'work') {
                this.$emit('move-to-next', this.task);
            }
        },
        handleMoveToNext() {
            if (this.type === 'work') {
                this.$emit('move-to-next', this.task);
            }
        },
        handleReturnToPrevious() {
            if (this.returnReason !== '') {
                this.task.reason = this.returnReason;
                this.$emit('return', this.task);
            } else {
                alert("Введите причину возврата");
            }
        },
        handleCompleteTask() {
            this.$emit('complete', this.task);
        }
    },
    template: `
    <div class="task">
        <span>Создано: {{ task.createdDate }}</span>
        <h3>{{ task.title }}</h3>
        <p v-if="!editingDescription">{{ task.description }}</p>
        <textarea v-model="editedDescription" v-if="editingDescription"></textarea>
        <span v-if="task.lastEdited">Отредактировано: {{ task.lastEdited }}</span><br><br>
        <span>Срок сдачи: {{ task.deadline }}</span><br><br>
        <button v-if="type === 'plan'" @click="handleDeleteTask">Удалить</button>
        <button v-if="type !== 'completed'" @click="handleEditDescription">{{ editingDescription ? 'Сохранить' : 'Редактировать' }}</button>
        <button v-if="type === 'plan'" @click="handleMoveTask">Переместить</button>
        <button v-if="type === 'work'" @click="handleMoveToNext">Переместить</button>
        <button v-if="type === 'testing'" @click="handleReturnToPrevious">Вернуть</button>
        <button v-if="type === 'testing'" @click="handleCompleteTask">Выполнено</button>
        <br>
        <textarea v-if="type === 'testing'" v-model="returnReason" placeholder="Введите причину возврата"></textarea>
        <span v-if="type === 'work' && task.reason">Причина возврата: {{ task.reason }}</span>
        <span v-if="type === 'completed'">{{ task.check }}</span>
    </div>
    `
});


new Vue({
    el: '#app'
});