import { SelectOption } from "@/types";
import nationalities from "./nationalities.lib.json";
import ng_lgas from "./ng_local_govs.lib.json";
import states from "./states.lib.json";

// L G A S  B Y  S T A T E
export const sort_lgas_by_state = (stateId: string) => {
  const filtered = ng_lgas.filter((x) => x.State_ID == Number(stateId));
  const result = filtered
    .sort((a, b) => a.LGA_Name.localeCompare(b.LGA_Name))
    .map((lga) => ({ value: lga.LGA_Name, label: lga.LGA_Name }));
  return result ?? [];
};

// S T A T E S  B Y  C O U N T R Y
export const sort_states_by_country = (countryId: number): SelectOption[] => {
  let result = states
    .filter((state) => Number(state.country_id) == countryId)
    .sort((a, b) => a.State_Name!?.localeCompare(b.State_Name!))
    .map((state) => ({ value: state.State_ID!, label: state.State_Name! }));
  return result;
};

export const getStateIDByName = (stateName: string): string | null => {
  const state = states.find((s) => s.State_Name && s.State_Name.toLowerCase() === stateName.toLowerCase());
  return state ? state.State_ID : null;
}

// A L L  C O U N T R I E S
export const allCountries = nationalities.map((nation) => ({
  value: nation.Country_Name,
  label: nation.Country_Name,
}));
