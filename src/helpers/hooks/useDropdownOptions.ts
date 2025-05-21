import { countries } from "@/lib/nationality-data.lib/countries";

import { useMemo } from "react";

export const useDropdownOptions = (
  occupations: any[],
  relationships: any[],
  maritalStatuses: any[],
  bloodGroups: any[],
  permitTypes: any[],
salutations:any[],
countries:any[],
trainingDuration:any[],
) => {
  const occupationOptions = useMemo(
    () =>
      occupations?.map((occupation) => ({
        label: occupation.name,
        value: occupation.id,
      })) || [],
    [occupations]
  );

  const relationshipOptions = useMemo(
    () =>
      relationships?.map((relation) => ({
        label: relation.name,
        value: relation.id,
      })) || [],
    [relationships]
  );

  const maritalStatusOptions = useMemo(
    () =>
      maritalStatuses?.map((status) => ({
        label: status.name,
        value: status.id,
      })) || [],
    [maritalStatuses]
  );
  const trainingDurationOptions = useMemo(
    () =>
      trainingDuration.map((duration) => ({
        label: duration.name,
        value: duration.id,
      })),
    [trainingDuration]
  );
  const bloodGroupOptions = useMemo(
    () =>
      bloodGroups?.map((group) => ({
        label: group.name,
        value: group.id,
      })) || [],
    [bloodGroups]
  );

  const permitTypeOptions = useMemo(
    () =>
      permitTypes?.map((type) => ({
        label: type.name,
        value: type.id,
      })) || [],
    [permitTypes]
  );

  const titleNameOptions = useMemo(
    () =>
      salutations?.map((title) => ({
        label: title.name,
        value: title.id,
      })) || [],
    [salutations]
  );
  const countryOptions = useMemo(
    () =>
      countries?.map((country) => ({
        label: country.name,
        value: country.id,
      })) || [],
    [countries]
  );
  

  return {
    occupationOptions,
    relationshipOptions,
    maritalStatusOptions,
    bloodGroupOptions,
    permitTypeOptions,
    titleNameOptions,
    countryOptions,
    trainingDurationOptions
  };
};
