import { getRndInteger, lorem } from '../../src/lib/utils';
import { phrases } from './words';
import titleImages from './titleImages';

export const createContent = () => {
  let content = '';

  const addTypos = () => {
    const tags = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'b',
      'strong',
      'blockquote',
    ];
    content += `<ol>`;
    tags.forEach((tag) => {
      content += `<li><${tag}>${tag} ):- ${lorem.generateWords(
        5
      )}</${tag}></li>`;
    });
    content += `</ol>`;
  };
  // addTypos();
  content += `<p><i>${lorem.generateSentences(getRndInteger(10, 30))}</i></p>`;
  const noOfProtion = getRndInteger(5, 30);
  let imageCount = 1;
  Array(noOfProtion)
    .fill(1)
    .forEach((v, index) => {
      // Insert heading
      content += `<h2>${
        phrases[getRndInteger(0, phrases.length - 1, true)]
      }</h2>`;

      const noOfPara = getRndInteger(4, 25, true);
      content += `<p>${lorem.generateSentences(noOfPara)}</p>`;

      const shouldInsertImage = getRndInteger(1, 50);

      if (
        index == 2 ||
        (index != noOfProtion - 1 &&
          shouldInsertImage > 20 &&
          shouldInsertImage < 25)
      ) {
        content += `<figure>`;
        content += `<img src=${
          titleImages[getRndInteger(0, titleImages.length)].secure_url
        } alt=${lorem.generateWords(3)} />`;
        content += `<figcaption>Fig.${imageCount++} - ${lorem.generateWords(
          getRndInteger(3, 7)
        )}</figcaption>`;
        content += `</figure>`;
      }
    });
  content += `<div class="end"/>`;
  return content;
};
