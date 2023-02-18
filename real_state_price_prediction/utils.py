import pickle
import json
import numpy as np

from real_state_price_prediction.settings import BASE_DIR


def get_estimated_price(location, sqft, bhk, bath):
    model = load_saved_artifacts()
    data_columns = get_data_columns()

    try:
        loc_index = data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(model.predict([x])[0], 2)


def load_saved_artifacts():
    location = str(BASE_DIR) + "/trained_model/banglore_home_prices_model.pickle"
    with open(location, 'rb') as f:
        model = pickle.load(f)
    return model


def get_location_names():
    return get_data_columns_and_locations(location_names=True)


def get_data_columns():
    return get_data_columns_and_locations(data_column=True)


def get_data_columns_and_locations(data_column=False, location_names=False):
    location = str(BASE_DIR) + "/trained_model/columns.json"
    with open(location, "r") as f:
        data_columns = json.load(f)['data_columns']
        locations = data_columns[3:]

    if data_column:
        return data_columns
    return locations
