/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const {Namer} = require('@parcel/plugin');
const path = require('path');

module.exports = new Namer({
  name({bundle}) {
    let mainAsset = bundle.getMainEntry();
    if (mainAsset?.filePath.includes('@react-spectrum/s2')) {
      if (bundle.needsStableName && bundle.target.distEntry) {
        return bundle.target.distEntry;
      }
      let ext = '.' + bundle.type;
      if (bundle.type === 'js') {
        ext = bundle.env.outputFormat === 'esmodule' ? '.mjs' : '.cjs';
      }
      return path.basename(mainAsset.filePath, path.extname(mainAsset.filePath)).replace(/^S2_Icon_(.*?)_\d+(?:x\d+)?_N$/, '$1') + ext;
    }
  }
});
