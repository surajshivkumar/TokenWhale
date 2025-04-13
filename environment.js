// Model-specific watt-hour per token values
const modelEnergyMap = {
  llama2: 0.4,
  bert: 0.2,
  mistral: 0.3,
  falcon: 0.8,
  gptj: 0.5,
  bloom: 1.0
};

// Helper for formatting big numbers with suffixes
const formatLargeNumber = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(2) + 'K';
  return num.toFixed(2);
};

// Populate state dropdown on page load
fetch('./environment.json')
  .then(res => res.json())
  .then(data => {
    const stateSelect = document.getElementById('state-select');
    Object.keys(data).forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
  })
  .catch(err => {
    console.error("Failed to populate state dropdown:", err);
  });

// Calculate environmental impact
document.getElementById('calculate-btn').onclick = () => {
  const state = document.getElementById('state-select').value;
  const model = document.getElementById('model-select').value;
  const tokens = parseFloat(document.getElementById('tokens-input').value);

  if (!state || !model || isNaN(tokens)) {
    alert("Please select a state, model, and enter a valid number of tokens.");
    return;
  }

  fetch('./environment.json')
    .then(res => res.json())
    .then(data => {
      console.log("Selected state:", state);
      console.log("Available data keys:", Object.keys(data));

      const stateData = data[state];
      if (!stateData) {
        alert(`No emission data found for state: ${state}`);
        return;
      }

      const co2_per_kwh = stateData.co2_per_kwh;
      const wh_per_token = modelEnergyMap[model];

      const energy_wh = tokens * wh_per_token;
      const energy_kwh = energy_wh / 1000;
      const ghg_emissions = energy_kwh * co2_per_kwh;

      const ev_distance = energy_kwh / 0.18 * 1000;
      const walking_distance = energy_kwh / 0.05 * 1000;
      const streaming_mins = energy_kwh / 0.00174;

      const update = (id, value, unit) => {
        const el = document.getElementById(id);
        el.style.opacity = 0;
        setTimeout(() => {
          el.textContent = `${formatLargeNumber(value)} ${unit}`;
          el.style.opacity = 1;
        }, 200);
      };

      update('energy', energy_wh, 'Wh');
      update('ghg', ghg_emissions, 'gCO₂eq');
      update('walk', walking_distance, 'm');
      update('ev', ev_distance, 'm');
      update('stream', streaming_mins, 'mins');

      // U.S. Extrapolation (1% of 331M × 365)
      const us_factor = 0.01 * 331_000_000 * 365;
      const total_kwh = energy_kwh * us_factor;
      const total_ghg_g = ghg_emissions * us_factor;

      const wind_kwh_yearly = 8760000;
      const avg_home_kwh_yearly = 10832;
      const car_emissions_per_mile = 404;

      update('wind-turbines', total_kwh / wind_kwh_yearly, '');
      update('city-multiplier', total_kwh / avg_home_kwh_yearly, '');
      update('car-miles', total_ghg_g / car_emissions_per_mile, '');
    })
    .catch(err => {
      console.error("Calculation error:", err);
      alert("Calculation failed. Check console for details.");
    });
};
