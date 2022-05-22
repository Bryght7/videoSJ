<!-- PROJECT SHIELDS -->
<!--
See the bottom of this document for the declaration of the reference variables
-->
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![Issues][issues-shield]][issues-url]
[![GPL-3.0 License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <p align="center">
    <img src="https://github.com/Bryght7/videoSJ/blob/main/assets/icons/96x96.png?raw=true" />
  </p>
  <h2 align="center">VideoSJ</h2>
  <p align="center">
    Shorten a media file by splitting it into parts and joining them back together, without re-encoding.
    <br />
  </p>
</p>

<p align="center">
    <img src="https://i.imgur.com/0bthibY.gif" alt="Demo screenshot"/>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [`git clone https://github.com/Bryght7/videoSJ.git`](#git-clone-httpsgithubcombryght7videosjgit)
  - [`npm install`](#npm-install)
- [Starting Development](#starting-development)
- [Packaging for Production](#packaging-for-production)
- [Contributing](#contributing)
- [License](#license)

## Features
- Open a media file (video/audio) via menu or drag-and-drop
- Split a media into parts by timestamps (start/end times)
- Reorder the media parts if needed
- Join all the media parts into a new media, created without re-encoding
- Media player included
- Dark/light theme
- Supported video types: `.mp4`, `.m4v`, `.webm`, `.ogg`, `.mov`
- Supported audio types: `.mp3`, `.wav`

## Built With

- [Electron React Boilerplate](https://electron-react-boilerplate.js.org/) - _A Foundation for Scalable Cross-Platform Apps_
- [Tailwind CSS](https://tailwindcss.com/) - _Rapidly build modern websites without ever leaving your HTML_
- [FFmpeg](https://www.ffmpeg.org/) - _A complete, cross-platform solution to record, convert and stream audio and video._

_This software uses code of <a href=http://ffmpeg.org>FFmpeg</a> licensed under the <a href=http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html>LGPLv2.1</a>. It has been built using [media-autobuild_suite](https://github.com/m-ab-s/media-autobuild_suite), with the following parameters:_
  ```
  [compiler list] 
  arch=3, license2=5, standalone=2, vpx2=2, aom=2, rav1e=2, dav1d=2, libavif=2, jpegxl=2, x2643=2, x2652=2, other265=2, svthevc=2, xvc=2, vvc=2, svtav1=2, svtvp9=2, flac=2, fdkaac=2, faac=2, exhale=2, mediainfo=2, soxB=2, ffmpegB2=1, ffmpegUpdate=2, ffmpegChoice=2, mp4box=2, rtmpdump=2, mplayer2=2, mpv=2, vlc=2, bmx=2, curl=2, ffmbc=2, cyanrip2=2, ripgrep=2, jq=2, jo=2, dssim=2, avs2=2, CC=2, cores=6, deleteSource=1, strip=1, pack=2, logging=1, autouploadlogs=1, updateSuite=2, timeStamp=1, ccache=2, noMintty=2
  ```
<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node.js 12.13.0 or higher
- npm

### Installation

### `git clone https://github.com/Bryght7/videoSJ.git`
Clones the repository.

### `npm install`
Installs npm packages & dependencies for the project.

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```


<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the GPL-3.0 License. See `LICENSE.md` for more information.

<!-- MARKDOWN LINKS & IMAGES -->

[issues-shield]: https://img.shields.io/github/issues/Bryght7/videosj
[issues-url]: https://github.com/Bryght7/videosj/issues
[license-shield]: https://img.shields.io/github/license/Bryght7/videosj
[license-url]: https://github.com/Bryght7/videosj/blob/master/LICENSE.md
