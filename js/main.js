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



new Vue({
    el: '#app'
});