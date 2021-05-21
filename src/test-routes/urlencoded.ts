
import { app, ValidationError, json } from "../api";


app.post("/urlencoded/pet/add/:petId", "UpdatePetWithForm", (request) => {
  const petId = request.params.petId;
  if (petId !== "1") {
    throw new ValidationError(`Expected petID 1 but got ${petId}`, undefined, request.params);
  }
  request.expect.containsHeader("content-type", "application/x-www-form-urlencoded");
  request.expect.containsHeader("content-length", "47");
  request.expect.bodyEquals({ pet_type: "dog", pet_food: "meat", name: "Fido", pet_age: "42" });
  return {
    status: 200,
  };
});
