# Personalizing the page

The page reads two optional files. Add them and everything wires up automatically.

## 1. The photo

Save Manish's photo here:

```
public/manish.jpg
```

- A square image works best (it's shown in a circular gold frame).
- It appears at the top of the hero and in the big "boom" moment of the intro.
- Until the file exists, a gold **M** monogram is shown instead.

## 2. The song

Save the background song here:

```
public/song.mp3
```

- It starts (with a gentle fade-in) when the visitor taps **Unwrap the Celebration**, loops while they browse, and can be paused/resumed with the **Music** button at the bottom-right and the mute button during the intro.
- Browsers only allow audio after a tap, so it will not autoplay before the intro is unwrapped.
- Until the file exists, the music button simply stays on "Play song".

## Different names or formats?

Edit the paths in [`src/assets.config.ts`](src/assets.config.ts):

```ts
export const PHOTO_SRC = '/manish.jpg'
export const MUSIC_SRC = '/song.mp3'
```

For example, use `/manish.png` for a PNG, or `/song.m4a` for an AAC file.
Anything placed in `public/` is served from the site root (`/`).
