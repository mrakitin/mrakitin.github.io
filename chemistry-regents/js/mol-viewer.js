// ── Molecule data (XYZ format) ────────────────────────
const MOLECULES = {

  /* ── VSEPR / Bonding ─────────────────────── */
  h2o: {
    name: 'Water', formula: 'H₂O',
    shape: 'Bent · 104.5°', note: '2 bond pairs + 2 lone pairs',
    xyz: `3\nwater\nO  0.000  0.000  0.119\nH  0.000  0.757 -0.476\nH  0.000 -0.757 -0.476`
  },
  co2: {
    name: 'Carbon Dioxide', formula: 'CO₂',
    shape: 'Linear · 180°', note: '2 double bonds, no lone pairs on C',
    xyz: `3\ncarbon dioxide\nC  0.000  0.000  0.000\nO  0.000  0.000  1.160\nO  0.000  0.000 -1.160`
  },
  ch4: {
    name: 'Methane', formula: 'CH₄',
    shape: 'Tetrahedral · 109.5°', note: '4 bond pairs, no lone pairs',
    xyz: `5\nmethane\nC  0.000  0.000  0.000\nH  0.629  0.629  0.629\nH -0.629 -0.629  0.629\nH -0.629  0.629 -0.629\nH  0.629 -0.629 -0.629`
  },
  nh3: {
    name: 'Ammonia', formula: 'NH₃',
    shape: 'Trigonal pyramidal · ~107°', note: '3 bond pairs + 1 lone pair',
    xyz: `4\nammonia\nN  0.000  0.000  0.116\nH  0.000  0.939 -0.271\nH  0.813 -0.470 -0.271\nH -0.813 -0.470 -0.271`
  },
  bf3: {
    name: 'Boron Trifluoride', formula: 'BF₃',
    shape: 'Trigonal planar · 120°', note: '3 bond pairs, no lone pairs on B',
    xyz: `4\nboron trifluoride\nB  0.000  0.000  0.000\nF  1.310  0.000  0.000\nF -0.655  1.134  0.000\nF -0.655 -1.134  0.000`
  },
  sf6: {
    name: 'Sulfur Hexafluoride', formula: 'SF₆',
    shape: 'Octahedral · 90°', note: '6 bond pairs (expanded octet)',
    xyz: `7\nsulfur hexafluoride\nS  0.000  0.000  0.000\nF  1.560  0.000  0.000\nF -1.560  0.000  0.000\nF  0.000  1.560  0.000\nF  0.000 -1.560  0.000\nF  0.000  0.000  1.560\nF  0.000  0.000 -1.560`
  },

  /* ── Organic chemistry ───────────────────── */
  ethane: {
    name: 'Ethane', formula: 'C₂H₆',
    shape: 'Alkane (single C–C bond)', note: 'Saturated · CₙH₂ₙ₊₂',
    xyz: `8\nethane\nC  0.000  0.000  0.770\nC  0.000  0.000 -0.770\nH  0.000  1.026  1.163\nH  0.889 -0.513  1.163\nH -0.889 -0.513  1.163\nH  0.000  1.026 -1.163\nH  0.889 -0.513 -1.163\nH -0.889 -0.513 -1.163`
  },
  ethene: {
    name: 'Ethene (Ethylene)', formula: 'C₂H₄',
    shape: 'Alkene (C=C double bond)', note: 'Unsaturated · CₙH₂ₙ · planar',
    xyz: `6\nethene\nC  0.000  0.000  0.670\nC  0.000  0.000 -0.670\nH  0.000  0.924  1.237\nH  0.000 -0.924  1.237\nH  0.000  0.924 -1.237\nH  0.000 -0.924 -1.237`
  },
  ethyne: {
    name: 'Ethyne (Acetylene)', formula: 'C₂H₂',
    shape: 'Alkyne (C≡C triple bond)', note: 'Unsaturated · CₙH₂ₙ₋₂ · linear',
    xyz: `4\nethyne\nC  0.000  0.000  0.600\nC  0.000  0.000 -0.600\nH  0.000  0.000  1.660\nH  0.000  0.000 -1.660`
  },
  ethanol: {
    name: 'Ethanol', formula: 'C₂H₅OH',
    shape: 'Alcohol (–OH group)', note: 'Functional group: hydroxyl · suffix -ol',
    xyz: `9\nethanol\nC  1.244  0.000  0.000\nC  0.000  0.000  0.886\nO -1.168  0.000  0.138\nH  1.236  0.894  0.628\nH  1.236 -0.894  0.628\nH  2.168  0.000 -0.578\nH  0.000  0.894  1.524\nH  0.000 -0.894  1.524\nH -1.817  0.000  0.845`
  },
  benzene: {
    name: 'Benzene', formula: 'C₆H₆',
    shape: 'Aromatic ring (delocalized π bonds)', note: 'All C–C bonds equal length (1.40 Å)',
    xyz: `12\nbenzene\nC  1.400  0.000  0.000\nC  0.700  1.212  0.000\nC -0.700  1.212  0.000\nC -1.400  0.000  0.000\nC -0.700 -1.212  0.000\nC  0.700 -1.212  0.000\nH  2.490  0.000  0.000\nH  1.245  2.156  0.000\nH -1.245  2.156  0.000\nH -2.490  0.000  0.000\nH -1.245 -2.156  0.000\nH  1.245 -2.156  0.000`
  },
  acetic_acid: {
    name: 'Acetic Acid', formula: 'CH₃COOH',
    shape: 'Carboxylic acid (–COOH group)', note: 'Functional group: carboxyl · suffix -oic acid',
    xyz: `8\nacetic acid\nC -1.362  0.053 -0.013\nC  0.064 -0.460 -0.010\nO  0.298 -1.673  0.011\nO  1.113  0.444 -0.025\nH  2.008 -0.009 -0.022\nH -1.373  1.141 -0.003\nH -1.888 -0.313  0.876\nH -1.888 -0.313 -0.902`
  },

  /* ── Acids & Bases ───────────────────────── */
  hcl: {
    name: 'Hydrochloric Acid', formula: 'HCl',
    shape: 'Diatomic · linear', note: 'Strong acid · donates H⁺ to water',
    xyz: `2\nHCl\nH  0.000  0.000  0.000\nCl 1.270  0.000  0.000`
  },
  h3o: {
    name: 'Hydronium Ion', formula: 'H₃O⁺',
    shape: 'Trigonal pyramidal', note: 'Present in all acidic aqueous solutions',
    xyz: `4\nhydronium\nO  0.000  0.000  0.116\nH  0.000  0.939 -0.271\nH  0.813 -0.470 -0.271\nH -0.813 -0.470 -0.271`
  }
};

// ── Style cycling ─────────────────────────────────────
const STYLES = [
  { label: 'Ball & Stick', stick: { radius: 0.12 }, sphere: { scale: 0.28 } },
  { label: 'Sticks only',  stick: { radius: 0.18 }, sphere: { scale: 0.0 } },
  { label: 'Space-fill',   stick: { radius: 0.0  }, sphere: { scale: 0.55 } }
];

// ── Build viewer for one .mol-card element ─────────────
function buildViewer(card) {
  const molKey = card.dataset.mol;
  const mol = MOLECULES[molKey];
  if (!mol) return;

  const viewerEl = card.querySelector('.mol-canvas');
  if (!viewerEl) return;

  // Ensure explicit pixel dimensions so WebGL canvas sizes correctly
  viewerEl.style.width = (viewerEl.offsetWidth > 0 ? viewerEl.offsetWidth : 240) + 'px';
  viewerEl.style.height = '200px';

  let styleIdx = 0;
  const viewer = $3Dmol.createViewer(viewerEl, { backgroundColor: '#f8fafc', antialias: true });
  viewer.addModel(mol.xyz, 'xyz');
  viewer.setStyle({}, { stick: STYLES[0].stick, sphere: STYLES[0].sphere });
  viewer.zoomTo();
  viewer.render();

  // Style toggle button
  const toggleBtn = card.querySelector('.mol-style-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      styleIdx = (styleIdx + 1) % STYLES.length;
      viewer.setStyle({}, { stick: STYLES[styleIdx].stick, sphere: STYLES[styleIdx].sphere });
      viewer.render();
      toggleBtn.textContent = STYLES[(styleIdx + 1) % STYLES.length].label + ' →';
    });
    toggleBtn.textContent = STYLES[1].label + ' →';
  }

  // Reset view button
  const resetBtn = card.querySelector('.mol-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => { viewer.zoomTo(); viewer.render(); });
  }
}

// ── Initialize all mol-cards on this page ─────────────
function initMolViewers() {
  if (typeof $3Dmol === 'undefined') {
    // 3Dmol not yet available — retry once after a short delay
    setTimeout(initMolViewers, 300);
    return;
  }
  document.querySelectorAll('.mol-card').forEach(buildViewer);
}

// Wait for full page load (layout computed) then init
window.addEventListener('load', initMolViewers);
