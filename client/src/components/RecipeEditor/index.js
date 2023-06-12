import React, { useState } from "react";
import "./RecipeEditor.css";
import { ReactComponent as PencilSvg } from "../../svgs/pencil.svg";
import { ReactComponent as XSvg } from "../../svgs/x.svg";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/authContext";
import * as API from "../../lib/api";
import { useNavigate } from "react-router-dom";

const RecipeEditor = ({ isNewRecipe, recipe, discardFunction }) => {
  const { checkSession } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState(isNewRecipe ? "" : recipe.title);
  const [description, setDescription] = useState(
    isNewRecipe ? "" : recipe.description
  );

  // console.log(recipe);

  const [image, setImage] = useState();
  const [imageState, setImageState] = useState();
  const [cuisines, setCuisines] = useState(["Mexican"]);
  const [time, setTime] = useState("Under 30 mins");
  const [restrictions, setRestrictions] = useState(["None"]);

  const [servingNumber, setServingNumber] = useState(1);

  const [ingredients, setIngredients] = useState(
    isNewRecipe ? [""] : recipe.ingredients
  );
  const [materials, setMaterials] = useState(
    isNewRecipe ? [""] : recipe.materials
  );

  const [instructions, setInstructions] = useState(
    isNewRecipe ? [""] : recipe.instructions
  );
  const [notes, setNotes] = useState(isNewRecipe ? [""] : recipe.notes);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleTime = (e) => setTime(e.target.value);
  const handleCuisines = (e, i) => {
    setCuisines((prev) => {
      let newState = [...prev];
      newState[i] = e.target.value;
      return newState;
    });
  };
  const handleRestrictions = (e, i) => {
    setRestrictions((prev) => {
      let newState = [...prev];
      newState[i] = e.target.value;
      return newState;
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImageState(e.target.value);
    console.log("IMAGE", image);
    console.log(imageState);
  };

  const handleServingNumber = (e) => setServingNumber(e.target.value);

  const handleIngredients = (e, i) => {
    setIngredients((prev) => {
      let newState = [...prev];
      newState[i] = e.target.value;
      return newState;
    });
  };
  const handleMaterials = (e, i) => {
    setMaterials((prev) => {
      let newState = [...prev];
      newState[i] = e.target.value;
      return newState;
    });
  };

  const handleInstructions = (e, i) => {
    setInstructions((prev) => {
      let newState = [...prev];
      newState[i] = e.target.value;
      return newState;
    });
  };
  const handleNotes = (e, i) => {
    setNotes((prev) => {
      let newState = [...prev];
      newState[i] = e.target.value;
      return newState;
    });
  };

  const addAnotherCuisineSelect = () => {
    setCuisines((prev) => [...prev, "Mexican"]);
  };
  const removeCuisineSelect = (i) => {
    console.log(i);
    setCuisines((prev) => {
      const newState = prev.filter((val, index) => index !== i);
      return newState;
    });
  };

  const addAnotherRestrictionSelect = () => {
    setRestrictions((prev) => [...prev, "None"]);
  };
  const removeRestrictionSelect = (i) => {
    setRestrictions((prev) => {
      const newState = prev.filter((val, index) => index !== i);
      return newState;
    });
  };

  const addAnotherIngredientInput = () => {
    setIngredients((prev) => [...prev, ""]);
  };
  const removeIngredientInput = (i) => {
    setIngredients((prev) => {
      const newState = prev.filter((val, index) => index !== i);
      return newState;
    });
  };

  const addAnotherMaterialInput = () => {
    setMaterials((prev) => [...prev, ""]);
  };
  const removeMaterialInput = (i) => {
    setMaterials((prev) => {
      const newState = prev.filter((val, index) => index !== i);
      return newState;
    });
  };

  const addAnotherInstructionInput = () => {
    setInstructions((prev) => [...prev, ""]);
  };
  const removeInstructionInput = (i) => {
    setInstructions((prev) => {
      const newState = prev.filter((val, index) => index !== i);
      return newState;
    });
  };

  const addAnotherNoteInput = () => {
    setNotes((prev) => [...prev, ""]);
  };
  const removeNoteInput = (i) => {
    setNotes((prev) => {
      const newState = prev.filter((val, index) => index !== i);
      return newState;
    });
  };

  const uploadRecipe = async (base64EncodedImage) => {
    const data = await API.createRecipe(
      title,
      description,
      time,
      cuisines,
      restrictions,
      servingNumber,
      ingredients,
      materials,
      instructions,
      notes,
      base64EncodedImage
    );
    checkSession();
    navigate(
      `/recipe/${data.result.recipes[data.result.recipes.length - 1].slug}`
    );
    return;
  };

  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title) {
      setError("Recipe title is required");
      return;
    }

    if (!description) {
      setError("Recipe description is required");
      return;
    }

    if (new Set(cuisines).size !== cuisines.length) {
      setError("Duplicate cuisines selected");
      return;
    }

    if (new Set(restrictions).size !== restrictions.length) {
      setError("Duplicate restrictions selected");
      return;
    }

    if (ingredients.includes("")) {
      setError("Cannot have an empty ingredient");
      return;
    }

    if (materials.includes("")) {
      setError("Cannot have an empty material");
      return;
    }

    if (materials.includes("")) {
      setError("Cannot have an empty material");
      return;
    }

    if (instructions.includes("")) {
      setError("Cannot have an empty instruction");
      return;
    }

    if (notes.includes("")) {
      setError("Cannot have an empty notes");
      return;
    }

    setError(null);
    // console.log(
    //   title,
    //   description,
    //   cuisines,
    //   time,
    //   restrictions,
    //   servingNumber,
    //   ingredients,
    //   materials,
    //   instructions,
    //   notes,
    //   image
    // );

    //  API call
    if (isNewRecipe) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        uploadRecipe(reader.result);
      };
      reader.onerror = () => {
        console.error("AHHHHHHHH!!");
      };
    } else {
      const data = await API.editRecipe(
        recipe._id,
        title,
        description,
        time,
        cuisines,
        restrictions,
        servingNumber,
        ingredients,
        materials,
        instructions,
        notes
      );
      console.log(data);
      checkSession();
      // navigate(`/recipe/${data.slug}`);
      return;
    }
  }

  const handleDiscard = () => {
    discardFunction();
  };

  return (
    <form className="RecipeEditor ">
      <header className="RecipeEditor__header">
        <div className="RecipeEditor__bannerContent">
          <TextInput
            type="text"
            size="large"
            variant="yellow"
            placeholder="Enter recipe title"
            label="Title"
            ariaLabel="Recipe title"
            value={title}
            onChange={handleTitle}
          />
          <TextInput
            type="text"
            isTextArea={true}
            variant="yellow"
            placeholder="Enter a short description for the recipe"
            label="Description"
            ariaLabel="Recipe description"
            value={description}
            onChange={handleDescription}
          />
          <SelectInput
            label="Time needed"
            ariaLabel="Time required to make the recipe"
            variant="yellow"
            options={["Under 30 mins", "~ 1 hour"]}
            value={time}
            onChange={handleTime}
          />
          <div className="RecipeEditor__multiSelectGroup">
            <label>Cuisines</label>
            {cuisines.map((val, i) => {
              return (
                <div
                  className="RecipeEditor__inputWrapper"
                  key={`newRecipe-cuisine-${i}`}
                >
                  <SelectInput
                    ariaLabel="Recipe cuisine"
                    variant="yellow"
                    multiple={true}
                    options={["Mexican", "Italian", "Indian", "Chinese", "Middle Eastern"]}
                    value={val}
                    onChange={(e) => {
                      handleCuisines(e, i);
                    }}
                  />
                  {i !== 0 && (
                    <Button
                      leftIcon={<XSvg className="RecipeEditor__cancelInput" />}
                      type="button"
                      variant="noStyle"
                      onClick={() => {
                        removeCuisineSelect(i);
                      }}
                    />
                  )}
                </div>
              );
            })}
            <Button
              text="Add another cuisine"
              variant="noStyle"
              onClick={addAnotherCuisineSelect}
              type="button"
              className="RecipeEditor__multiSelectButton"
            />
          </div>
          <div className="RecipeEditor__multiSelectGroup">
            <label>Restrictions</label>
            {restrictions.map((val, i) => {
              return (
                <div
                  className="RecipeEditor__inputWrapper"
                  key={`newRecipe-restriction-${i}`}
                >
                  <SelectInput
                    ariaLabel="Recipe Restriction"
                    variant="yellow"
                    multiple={true}
                    options={["None", "Vegetarian"]}
                    value={val}
                    onChange={(e) => {
                      handleRestrictions(e, i);
                    }}
                    key={`newRecipe-restriction-${i}`}
                  />
                  {i !== 0 && (
                    <Button
                      leftIcon={<XSvg className="RecipeEditor__cancelInput" />}
                      type="button"
                      variant="noStyle"
                      onClick={() => {
                        removeRestrictionSelect(i);
                      }}
                    />
                  )}
                </div>
              );
            })}
            <Button
              text="Add another restriction"
              variant="noStyle"
              onClick={addAnotherRestrictionSelect}
              type="button"
              className="RecipeEditor__multiSelectButton"
            />
          </div>
        </div>
        <div className="RecipeEditor__bannerImgWrapper">
          <label className="RecipeEditor__bannerImgLabel">
            <PencilSvg
              className="RecipeEditor__pencilIcon"
              htmlFor="newRecipeBannerImgInput"
            />
            <span>Add image</span>
            <input
              type="file"
              id="newRecipeBannerImgInput"
              className="RecipeEditor__bannerImgInput"
              value={imageState}
              onChange={handleImage}
            />
          </label>
        </div>
      </header>
      <main className="RecipeEditor__main">
        <div className="RecipeEditor__leftBar">
          <h2 className="RecipeEditor__sectionTitle RecipeEditor__sectionTitle--lessMargin">
            Ingredients
          </h2>
          <div>
            <TextInput
              type="number"
              label="How many people does 1 serving serve"
              ariaLabel="How many people does 1 serving serve"
              variant="green"
              placeholder="1"
              min={1}
              className="RecipeEditor__servingInput"
              value={servingNumber}
              onChange={handleServingNumber}
            />
            <div className="RecipeEditor__inputList">
              <p>Add ingredients</p>
              <div className="RecipeEditor__multiSelectGroup">
                {ingredients.map((value, i) => {
                  return (
                    <div
                      className="RecipeEditor__inputWrapper"
                      key={`newRecipe-ingredient-${i}`}
                    >
                      <TextInput
                        type="text"
                        placeholder="1-2 cloves of garlic"
                        variant="green"
                        value={value}
                        onChange={(e) => {
                          handleIngredients(e, i);
                        }}
                      />
                      {i !== 0 && (
                        <Button
                          leftIcon={
                            <XSvg className="RecipeEditor__cancelInput" />
                          }
                          type="button"
                          variant="noStyle"
                          onClick={() => {
                            removeIngredientInput(i);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
                <Button
                  text="Add another ingredient"
                  variant="outline"
                  type="button"
                  onClick={addAnotherIngredientInput}
                />
              </div>
            </div>
          </div>
          <h2 className="RecipeEditor__sectionTitle RecipeEditor__sectionTitle--lessMargin">
            Materials
          </h2>
          <div className="RecipeEditor__inputList">
            <p>Add materials</p>
            <div className="RecipeEditor__multiSelectGroup">
              {materials.map((value, i) => {
                return (
                  <div
                    className="RecipeEditor__inputWrapper"
                    key={`newRecipe-material-${i}`}
                  >
                    <TextInput
                      type="text"
                      placeholder="Stove"
                      variant="green"
                      value={value}
                      onChange={(e) => {
                        handleMaterials(e, i);
                      }}
                    />
                    {i !== 0 && (
                      <Button
                        leftIcon={
                          <XSvg className="RecipeEditor__cancelInput" />
                        }
                        type="button"
                        variant="noStyle"
                        onClick={() => {
                          removeMaterialInput(i);
                        }}
                      />
                    )}
                  </div>
                );
              })}
              <Button
                text="Add another Material"
                variant="outline"
                type="button"
                onClick={addAnotherMaterialInput}
              />
            </div>
          </div>
        </div>
        <div className="RecipeEditor__mainContent">
          <h2 className="RecipeEditor__sectionTitle">Instructions</h2>
          <div className="RecipeEditor__multiSelectGroup RecipeEditor__multiSelectGroup--largerGap">
            {instructions.map((value, i) => {
              return (
                <div
                  className="RecipeEditor__inputWrapper"
                  key={`newRecipe-instruction-${i}`}
                >
                  <TextInput
                    label={`Step ${i + 1}`}
                    type="text"
                    isTextArea={true}
                    placeholder="Enter instruction"
                    variant="yellow"
                    value={value}
                    onChange={(e) => {
                      handleInstructions(e, i);
                    }}
                  />
                  {i !== 0 && (
                    <Button
                      leftIcon={
                        <XSvg className="RecipeEditor__cancelInput RecipeEditor__cancelInput--withLabel" />
                      }
                      type="button"
                      variant="noStyle"
                      onClick={() => {
                        removeInstructionInput(i);
                      }}
                    />
                  )}
                </div>
              );
            })}
            <Button
              text="Add another Step"
              variant="outline"
              type="button"
              onClick={addAnotherInstructionInput}
            />
          </div>
          <h2 className="RecipeEditor__sectionTitle RecipeEditor__sectionTitle--topMargin">
            Notes/Tips
          </h2>
          <div className="RecipeEditor__multiSelectGroup RecipeEditor__multiSelectGroup--largerGap">
            {notes.map((value, i) => {
              return (
                <div
                  className="RecipeEditor__inputWrapper"
                  key={`newRecipe-note-input-${i}`}
                >
                  <TextInput
                    type="text"
                    isTextArea={true}
                    placeholder="Enter Note/tip"
                    variant="yellow"
                    value={value}
                    onChange={(e) => {
                      handleNotes(e, i);
                    }}
                  />
                  {i !== 0 && (
                    <Button
                      leftIcon={
                        <XSvg className="RecipeEditor__cancelInput RecipeEditor__cancelInput--top" />
                      }
                      type="button"
                      variant="noStyle"
                      onClick={() => {
                        removeNoteInput(i);
                      }}
                    />
                  )}
                </div>
              );
            })}
            <Button
              text="Add another Note/tip"
              variant="outline"
              type="button"
              onClick={addAnotherNoteInput}
            />
          </div>
        </div>
      </main>
      <div className="RecipeEditor__bottomBar">
        <div className="RecipeEditor__bottomBarWrapper">
          <h3 className="RecipeEditor__bottomBarHeading">
            {isNewRecipe ? "Create Recipe" : "Edit Recipe"}
          </h3>
          <div className="RecipeEditor__bottomBarFormWrapper">
            {!!error && <p className="RecipeEditor__error">{error}</p>}
            <Button
              text="Save"
              ariaLabel="Save"
              type="submit"
              onClick={handleSubmit}
              variant="primary"
            />
            {!isNewRecipe && (
              <Button
                text="Discard"
                ariaLabel="Discard"
                type="button"
                onClick={handleDiscard}
                variant="outline"
                className="RecipeEditor__bottomBarButton"
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default RecipeEditor;
