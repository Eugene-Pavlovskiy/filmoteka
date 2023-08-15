# Parcel boilerplate

## Hidden files

Enable the display of hidden files and folders in the explorer of your operating system, otherwise, you will not be able to select and copy your project settings files.
otherwise, you will not be able to select and copy to yourself project settings files whose names begin with a dot.

## Dependencies

LTS-version [Node.js](https://nodejs.org/en/) should be installed on your computer with all the with all additional tools except **Chocolatey** - you don't need to install it.

## Before starting work

Once per project to install all dependencies.

```shell
npm ci
```

### Development

Start the development mode.

```shell
npm run dev
```

In the browser tab, go to [http://localhost:1234](http://localhost:1234).

### Deploy

The build will automatically build and deploy the production version of the project to GitHub Pages, in the `gh-pages`, every time the `main` branch is updated. For example, after a direct push or an accepted pool-request. To do this, in the `package.json` file, edit the `homepage` field and the script `build` by replacing `user_name` and `repository_name` with your own.

```json
"homepage": "https://имя_пользователя.github.io/имя_репозитория",
"scripts": {
  "build": "parcel build src/*.html --public-url /имя_репозитория/"
},
```

Just in case, you should go to the repository settings `Settings` > `Pages` and make sure that the production versions of the files are distributed from the `/root` branch of `gh-pages`. versions of files are distributed from the `/root` folder of the `gh-pages` branch.

After some time, the live page can be viewed at the address specified in the edited `homepage` property.
`homepage` property, e.g.
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

## Files & Folders

- All style file parshals should be in the `src/sass` folder and imported into the
  `src/sass/main.scss`
- Add images to the `src/images` folder, optimizing them in advance. The builder simply copies
  images to avoid overloading the system with optimizing images, because on weak computers it may take a lot of time.
  computers it may take a lot of time.
