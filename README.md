# Tridax 🌼

Tridax is a proposal for runtime side effect transformation for media files.

## What is tridax?

Tridax keep media file transformation using key to array value

```json
{
 "crop": [
  {"x": [100, 0], "y": [2, 300]}
 ],
 "position": [[0,1]],
 "resize": [100,100],
}
```

> We still keep the original image and only mutate the filter metadata and apply the transformations at runtime

## Tridax usage? 🔧

Tridax can be used for version control of media files while also keeping the original image.

```ts
import {file, apply} from "tridax";

const user = "Caleb";
file.addEventListener("save", function(transformation){
 return {
  editor: user,
  transformation,
 }
});

file.registerPlugin("crop", applyCropFilter);
file.registerPlugin("position", applyPosition);
file.registerPlugin("resize", applyResize);

async function getPreviewImage(){
 const tridax =  await file.open("image.trx");
  const file = await tridax.transform();

 return [tridax, file];
}


/// In editor UI
const image = new Image();
const [tridax, file] = await getPreviewImage();

tridax.onChange = function(file){
 image.src = createObjectURL(file);
}

rotate.onClick = function(degree){
 tridax.apply("rotate", degree);
}

filter.onClick = function(value){
 tridax.apply(value.type, value);
}

//// register all events like keybindings , 
/// button pressed, drags to apply transformation to tridax file
```

## Tridax plugins 🚧

- [ ] `.Pd` files not yet supported to be called `.pdx`

### Proposal

To work with collection of assets like layer, images all transformation applied on the collection is isolated.

Example of a `.pdx` file

```ts
/// beelearn.pdx
canvas.trx // asset 1.
image.trx  // asset 2.
layer.trx  // asset 3.
layer-state.json /// This contains all asset collection states like position on canvas and others
/// Assets 1, 2, 3 filter and transformations are isolated from layer-state.json states and transformations are applied at runtime
```

#### Read collection files

```ts
/// example of open preview function 
async function open(fileName){
 const trx = await tridax.open(fileName, "pdx");
 const file = await trx.readFile();
 const layers = await trx.readLayers();
 const state = await trx.readState();
 for(const layer of layers){
   applyTransformation(file, layers);
 }
 applyTransformation(file, state);

 return file;
}

```

#### Get filter history from layers

> check tridax file, loop through layers and check individual layer filter metadata.

```
.revert("crop", depth=-1) /// a function call by editor
```

> `Commits and ClI` revert is different from editor revert (This is basically undoing changes to previously applied changes from filter metadata in editor) While CLI revert simply revert the whole tridax file to previous snapshot from commit reference/hash.

### CLI 🚧🚧 built on git

Still working on proposal
