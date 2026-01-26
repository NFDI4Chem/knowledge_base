# Custom Components

## FloatImage

A responsive image component with optional linking and custom styling capabilities.

**Import:**

```jsx
import FloatImage from "@site/src/components/commons/FloatImage";
```

**Usage:**

```jsx
<FloatImage 
  url="/img/example.png" 
  alt="Example image"
  width="300px"
  link="https://example.com"
/>
```

**Props:**

* `url` (string, required) - Path to the image file (relative to static folder)
* `alt` (string, required) - Alternative text for the image
* `link` (string, optional) - URL to wrap the image in a clickable link
* `...props` (any CSS properties) - Any additional props are applied as inline styles (e.g., `width`, `float`, `margin`)

**Default Styling:**

The component has the following default styling:

* `width: min(120px, 50%)` - Responsive width with 120px maximum
* `float: right` - Floats to the right by default
* `margin: 0px 20px 0px 20px` - 20px left and right margin

Any of these can be overriden by passing props:

```jsx
<FloatImage 
  url="/img/chart.png" 
  alt="Data visualization"
  width="400px"
  float="left"
  margin="1em 0"
/>
```

***

## LbeChip

A clickable chip component that links to the Lead by Example datasets page filtered by a specific subdiscipline.

**Import:**

```jsx
import LbeChip from "@site/src/components/commons/LbeChip";
```

**Usage:**

```jsx
<LbeChip title="organic chemistry" />
```

**Props:**

* `title` (string, required) - The subdiscipline name used for filtering datasets

***

## FeatureButton

A clickable button component that displays an image with text, designed for feature navigation.

**Import:**

```jsx
import FeatureButton from "@site/src/components/features/FeatureButton";
```

**Usage:**

```jsx
<FeatureButton 
  url="/docs/example"
  imgUrl="/img/icon.svg"
  text="Feature Name"
  width="150px"
  alt="Feature icon"
/>
```

**Props:**

* `url` (string, required) - The link destination URL
* `imgUrl` (string, required) - Path to the image/icon (relative to static folder)
* `text` (string, required) - Button text displayed below the image
* `width` (string, optional) - Width of the image (default: "120px")
* `alt` (string, optional) - Alternative text for the image (defaults to `text` if not provided)
* `index` (boolean, optional) - If true, applies primary button styling; otherwise uses secondary styling
* `classes` (string, optional) - Additional CSS classes to apply to the button

***

## BulletBox

A styled box component designed to display content in a responsive card-like button format.

**Import:**

```jsx
import { BulletBox } from "@site/src/components/commons/BulletBox";
```

**Usage:**

```jsx
<BulletBox secondary>
  <h3>Feature Title</h3>
  <p>Feature description goes here.</p>
</BulletBox>
```

**Props:**

* `children` (ReactNode, required) - Content to display inside the box
* `secondary` (boolean, optional) - If true, applies secondary button styling; otherwise uses primary styling

***

## BulletContainer

A wrapper component that arranges multiple BulletBox components in a responsive grid layout.

**Import:**

```jsx
import { BulletContainer } from "@site/src/components/commons/BulletBox";
```

**Usage:**

```jsx
<BulletContainer>
  <BulletBox>
    <h3>Feature 1</h3>
    <p>Description 1</p>
  </BulletBox>
  <BulletBox secondary>
    <h3>Feature 2</h3>
    <p>Description 2</p>
  </BulletBox>
</BulletContainer>
```

**Props:**

* `children` (ReactNode, required) - Typically contains multiple BulletBox components
