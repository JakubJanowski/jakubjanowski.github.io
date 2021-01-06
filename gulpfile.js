const { spawn } = require("child_process");
const gulp = require("gulp");
const readlineSync = require("readline-sync");
const replace = require("gulp-replace");
const sass = require("gulp-sass");

const distDir = "dist";
const deployBranch = "gh-pages";

function cname() {
  return gulp.src("CNAME").pipe(gulp.dest(distDir));
}

function favicon() {
  return gulp.src("favicon.png").pipe(gulp.dest(distDir));
}

function html() {
  return spawn("eleventy", [], { shell: true, stdio: "inherit" });
}

function replaceSpace() {
  return gulp
    .src(distDir + "/**/*.html")
    .pipe(replace("&#32;", " "))
    .pipe(gulp.dest(distDir));
}

function robots() {
  return gulp.src("robots.txt").pipe(gulp.dest(distDir));
}

function sitemap() {
  return gulp.src("sitemap.xml").pipe(gulp.dest(distDir));
}

function sitemapReminder(done) {
  if (readlineSync.keyInYN("Did you update the sitemap?")) {
    return done();
  }
  console.log("Ok, aborting deployment.");
  process.exit(1);
}

function styles() {
  return gulp
    .src("src/styles/main.scss")
    .pipe(sass())
    .pipe(gulp.dest(distDir + "/src/"));
}

gulp.task("assets", gulp.parallel(favicon));

gulp.task("clean", function () {
  return spawn("rimraf " + distDir, [], {
    shell: true,
    stdio: "inherit"
  });
});

gulp.task("deploy", function () {
  return spawn(
    "cd " +
      distDir +
      " && git init" +
      " && git add ." +
      ' && git commit -m "deploy"' +
      " && git remote add origin https://github.com/JakubJanowski/jakubjanowski.github.io" +
      " && git push --force origin main:" +
      deployBranch +
      " && rimraf .git" +
      " && cd ..",
    [],
    { shell: true, stdio: "inherit" }
  );
});

gulp.task("rootfiles", gulp.parallel(cname, robots, sitemap));

gulp.task("src", gulp.parallel(gulp.series(html, replaceSpace), styles));

gulp.task("dev", gulp.series("clean", gulp.parallel("assets", "src")));

gulp.task(
  "dist",
  gulp.series(
    sitemapReminder,
    "clean",
    gulp.parallel("assets", "rootfiles", "src"),
    "deploy"
  )
);
