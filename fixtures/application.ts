import { test as base } from '@playwright/test';
import { UIFunctions } from "../resources/ui/ui-functions";

type AppFixtures = {
    uiFunctions: UIFunctions
}

export const test = base.extend<AppFixtures>({ uiFunctions: async ({ page }, use) => {
    const appUI = new UIFunctions(page);
    await use(appUI);
  },
});

export { expect } from '@playwright/test';