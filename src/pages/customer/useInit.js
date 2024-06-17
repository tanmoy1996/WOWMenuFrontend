import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setRestaurant,
  setRestaurantId,
  setTable,
} from "../../store/reducers/restaurantReducer";
import { setCategory } from "../../store/reducers/productReducer";

export default function useProductSearch() {
  const dispatch = useDispatch();
  // TODO: pick up restaurant Id and table table from URL and GET restaurant details
  const restaurantId = "63077d6ac31f771aaca9c858";
  const REACT_APP_BASE_URL = "https://wowmenubackend.onrender.com";
  const table = 7;
  dispatch(setRestaurantId(restaurantId));
  dispatch(setTable(table));
  axios
    .get(
      "https://api.json-generator.com/templates/qQNrYP3Qftv6/data?access_token=sr5evx3wg5ok41tjpvfyqb0d9aesmtr1usqiix4z",
    )
    .then((res) => {
      dispatch(setRestaurant(res.data));
    });

  axios
    .get(
      `${REACT_APP_BASE_URL}/api/categories?restaurant=${restaurantId}&isActive=true`,
    )
    .then((res) => {
      dispatch(
        setCategory(
          res.data.data.map(({ name, id }) => ({ name, id, page: 1 })),
        ),
      );
    });
}
