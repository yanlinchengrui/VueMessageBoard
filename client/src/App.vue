<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container d-flex justify-content-between">
        <a class="navbar-brand" href="#/">Peter's Message Board</a>

        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li>
              <a class="git" href="https://github.com/yanlinchengrui" target="_blank">
                <i class="fab fa-github-alt"></i> Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view class="container" />
  </div>
</template>

<style>
.navbar.bg-dark {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  padding: 0;
}

.navbar {
  font-family: "Righteous", cursive;
  font-size: 23px;
}

.navbar-brand {
  font-size: 1.2em;
}

.git {
  color: white;
  transition: 0.3s;
}

.git:hover {
  color: cyan;
}
</style>
