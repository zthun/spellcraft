import { IZLifecycleAttributeChanged, ZAttribute, ZComponentDirective } from '@zthun/spellcraft';

@ZComponentDirective({ name: 'ZSpellcraftIcon', extend: 'img' })
export class ZSpellcraftIconElement extends HTMLImageElement implements IZLifecycleAttributeChanged {
  public static readonly observedAttributes = ['size'];

  private static SizeChart = { xs: 1, sm: 2, md: 3, lg: 8, xl: 15 };

  @ZAttribute({ fallback: 'md' })
  public size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  public constructor() {
    super();

    this.src = '/images/svg/spellcraft.svg';
    this.attributeChangedCallback();
  }

  public attributeChangedCallback(): void {
    this.style.height = `${ZSpellcraftIconElement.SizeChart[this.size]}rem`;
  }
}
