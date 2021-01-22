import Tooltip from '../components/Tooltip.svelte';

export function tooltipable(node, { data, target = document.body }) {
  let component;

  function handleMouseleave(e) {
    component.$destroy();
    node.removeEventListener('mouseleave', handleMouseleave)
  }

  function handleMouseenter(e) {
    const { title, description, foregroundColor, backgroundColor } = data;
    const { pageX: x, pageY: y } = e;
    const { clientWidth: targetWidth, clientHeight: targetHeight } = target;

    component = new Tooltip({
      target,
      props: {
        title,
        description,
        x, 
        y: y + 15,
        foregroundColor,
        backgroundColor,
        targetWidth,
        targetHeight
      },
      intro: true
    });

    node.addEventListener('mouseleave', handleMouseleave)
  }

  node.addEventListener('mouseenter', handleMouseenter);

  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseenter);
    },
    update(data) {
      target = data.target;
    },
  };
};
