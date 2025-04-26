<script setup lang="ts">
useHead({
  title: 'Seng Heat - Developer Portfolio',
  meta: [
    { name: 'description', content: 'Seng Heat Developer Portfolio' }
  ]
})

const { data: message } = await useFetch('/api/user-detail')

const skills = [
  { name: 'Flutter 🚀', logo: 'https://cdn.prod.website-files.com/5ee12d8d7f840543bde883de/5ef3a1148ac97166a06253c1_flutter-logo-white-inset.svg', description: 'Cross-platform mobile app development 📱.' },
  { name: 'Laravel  🛠️', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png', description: 'PHP framework for web applications 🌐.' },
  { name: 'Vue.js  🌿', logo: 'https://austingil.com/wp-content/uploads/Vue-Blog-Cover.png', description: 'JavaScript framework for building user interfaces 🖥️.' },
]

const experience = [
  {
    title: 'Internship-Junior Mobile Developer 📱',
    company: 'Education 🎓',
    period: 'Apr 2024 - Feb 2025',
    description: 'Working on building mobile applications using Flutter and Firebase. Responsible for integrating Firebase services like authentication, database, and cloud functions to build robust cross-platform apps ☁️.'
  },
  {
    title: 'Junior Backend Developer 🖥️',
    company: 'Logistic 🚚',
    period: 'Mar 2025 - Present',
    description: 'Involved in the development of REST APIs using Laravel, handling database queries, and maintaining server-side logic for web applications 🔥.'
  }
]

const education = [
  {
    degree: 'High School Diploma 🎓',
    university: 'Some High School 🏫',
    year: '2018 - 2021',
    description: 'Focused on science and technology 🔬.'
  },
  {
    degree: 'Bachelor of Science in Computer Science 🎓',
    university: 'University of Cambodia 🏛️',
    year: '2023 - Present',
    description: 'Software engineering, web and mobile dev 📚.'
  },
  {
    degree: 'Mobile Full-Stack 📱🌐',
    university: 'Sala IT 🏫',
    year: 'September-2023, December-2023',
    description: 'Studied Flutter, Laravel and MySQL 🚀.'
  }
]

const projects = [
  {
    title: 'Task Management System ✅',
    description: 'Task management app with Vue, Nuxt, and Tailwind ⚡.',
    image: 'https://i.pinimg.com/474x/a7/c2/e4/a7c2e4f230781661ac1a603fc768eddd.jpg',
    url: 'https://github.com/yourusername/task-management-system'
  },
  {
    title: 'E-commerce Website 🛒',
    description: 'Robust e-commerce site with Laravel and Vue 🏬.',
    image: 'https://i.pinimg.com/474x/b9/ec/14/b9ec14c005067b98b08deb8d4996c61e.jpg',
    url: 'https://github.com/yourusername/e-commerce-website'
  },
  {
    title: 'Flutter Mobile App 📱',
    description: 'Task management mobile app using Flutter 🚀.',
    image: 'https://i.pinimg.com/474x/af/08/d0/af08d02d9e300cf83baebb3b772344b0.jpg',
    url: 'https://github.com/yourusername/flutter-app'
  }
]

const handleFileUpload = (index: number, event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      projects[index].image = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const submitContactForm = () => {
  window.open('tg://resolve?domain=seng_heat');
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">

    <!-- Profile Image Section -->
    <section class="py-8 bg-gray-50 dark:bg-gray-900 text-center">
      <img
          src="https://avatars.githubusercontent.com/u/150521943?v=4"
          alt="Seng Heat Profile"
          class="w-36 h-36 rounded-full mx-auto object-cover shadow-lg mb-4 border-4 border-blue-600 dark:border-blue-400"
      />
      <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100">Seng Heat </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-300">IT Student </p>
    </section>

    <!-- Hero Section -->
    <section class="bg-blue-600 text-white text-center py-20 animate__animated animate__fadeIn">
      <h1 class="text-5xl font-bold">Hi, I'm Seng Heat 👋</h1>
      <p class="mt-4 text-lg">A passionate developer who loves to build apps 💻</p>
      <NuxtLink to="/" class="mt-8 inline-block bg-blue-800 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition">Learn More</NuxtLink>
    </section>

    <!-- Skills Section -->
    <section class="py-16 bg-gray-100 dark:bg-gray-800">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 animate__animated animate__fadeInUp">Skills</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="skill in skills" :key="skill.name" class="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:scale-105 transition-all duration-300 ease-in-out animate__animated animate__fadeInUp">
            <img :src="skill.logo" alt="Skill Logo" class="h-16 mx-auto mb-4"/>
            <h3 class="text-xl font-semibold text-blue-600 dark:text-blue-400">{{ skill.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 animate__animated animate__fadeInUp">Experience</h2>
        <div class="space-y-8">
          <div v-for="job in experience" :key="job.title" class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md animate__animated animate__fadeInUp">
            <h3 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{{ job.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mt-2">{{ job.company }} - {{ job.period }}</p>
            <p class="text-gray-600 dark:text-gray-300 mt-2">{{ job.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="py-16 bg-gray-100 dark:bg-gray-800">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 animate__animated animate__fadeInUp">Education</h2>
        <div class="space-y-8">
          <div v-for="edu in education" :key="edu.degree" class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp">
            <h3 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{{ edu.degree }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mt-2">{{ edu.university }} - {{ edu.year }}</p>
            <p class="text-gray-600 dark:text-gray-300 mt-2">{{ edu.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 animate__animated animate__fadeInUp">Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(project, index) in projects" :key="project.title" class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out animate__animated animate__fadeInUp">
            <img :src="project.image" alt="Project Image" class="w-full h-48 object-cover rounded-lg mb-4"/>
            <h3 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mt-2">{{ project.description }}</p>
            <NuxtLink :to="project.url" class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition">View Project</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 animate__animated animate__fadeInUp">Contact Me</h2>
        <form @submit.prevent="submitContactForm" class="max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div class="mb-4">
            <label for="name" class="block text-left text-gray-800 dark:text-gray-100">Name</label>
            <input v-model="contactForm.name" id="name" type="text" class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mt-2" required />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-left text-gray-800 dark:text-gray-100">Email</label>
            <input v-model="contactForm.email" id="email" type="email" class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mt-2" required />
          </div>
          <div class="mb-4">
            <label for="message" class="block text-left text-gray-800 dark:text-gray-100">Message</label>
            <textarea v-model="contactForm.message" id="message" rows="4" class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mt-2" required></textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">Send Message</button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-10">
      <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        <!-- Left: Logo or Name -->
        <div class="flex items-center space-x-2 mb-4 md:mb-0">
          <img src="https://avatars.githubusercontent.com/u/150521943?v=4" alt="Seng Heat Logo" class="h-10 w-10 rounded-full object-cover border-2 border-blue-500">
          <span class="text-lg font-semibold">Seng Heat 🚀</span>
        </div>

        <div class="text-gray-400 text-sm">
          &copy; 2024 Seng Heat. Made with ❤️ using Nuxt & Tailwind.
        </div>

      </div>
    </footer>


  </div>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
</style>
