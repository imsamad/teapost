const style = `<style>
.content *{
  font-family:"Nunito", "Times New Roman", Times, serif;

}
.content p {   
  text-align: justify;
  line-height: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
}
.content ul,
.content ol {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.content ul li,
.content ol li {
  line-height: 1.5rem;
}
.content ul ul,
.content ol ul,
.content ul ol,
.content ol ol {
  margin-top: 0;
  margin-bottom: 0;
}
.content blockquote {
  line-height: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.content h1,.content h2,.content h3,.content h4,.content h5,
.content h6 {
  font-weight:600;
  margin-top: 0.5rem;
  margin-bottom: 0;

}
.content h1 {
  font-size: 3rem;
  line-height: 4.5rem;
  margin-top:2rem;
  margin-bottom:2rem;
}
.content h2 {
  font-size: 2.25rem;
  line-height: 3.375rem;
  // margin-top:1rem;
  margin-bottom:1rem;
}
.content h3 {
  font-size: 1.875rem;
  line-height:2.8125rem;
}
.content h4 {
  font-size: 1.25rem;
  line-height:1.875rem;
}
.content h5 {
  font-size: 1rem;
  line-height:1.5rem;
  // font-size: 0.4713333333333333rem;
}
.content h6 {
  // font-size: 0.3535rem;
  font-size: 0.875rem;
  line-height:1.3125rem;
}

.content table {
  margin-top: 1.5rem;
  border-spacing: 0px;
  border-collapse: collapse;
}
.content table td,
.content table th {
  padding: 0;
  line-height: 33px;
}

.content code {
  vertical-align: bottom;
}
.content img{
  margin:auto;
  margin-top:1rem;
  max-width:400px;
  max-height:300px;
  width:400px;
  height:300px;
  aspect-ratio:4 / 3;
}
.content figcaption {
  font-style: italic;
  padding: 2px;
  text-align: center;
}
.content .lead {
  font-size: 1.414rem;
} 

.content .hug {
  margin-top: 0;
}

.content blockquote {
  font-style:italic;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  border-style: solid;
  border-color: #b1b1b1;
  border-left-width: 5px;
  padding: 0 5px 0 20px;
  border-width: 0 0 0 5px;
  border-top-color: rgb(177, 177, 177);
  border-top-style: solid;
  border-top-width: 0px;
  border-right-color: rgb(177, 177, 177);
  border-right-style: solid;
  border-right-width: 0px;
  border-bottom-color: rgb(177, 177, 177);
  border-bottom-style: solid;
  border-bottom-width: 0px;
  border-left-color: rgb(177, 177, 177);
  border-left-style: solid;
  border-left-width: 5px;
}
.content .end {
  display:flex;
  justify-content:space-around;
  align-items:center;
  width: 100%;
  margin: 1rem;
  padding: 0;
  text-align: center;
}
.content .end {
  border:2px solid #999;
  height:0;
  border-radius:50%
} 
</style>`;

const script = `<script>
const wrapper = document.createElement('div');
const toWrap = document.getElementsByTagName('img')[0];
toWrap.classList.add(".img")
console.log("toWrap",toWrap);
toWrap.parentNode.appendChild(wrapper);
wrapper.appendChild(toWrap);
</script>`;

const Render = ({ value }: { value: string }) => {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `<div>${script}${style}${value}</div>`,
        }}
        className="content"
        style={{ border: '0px solid green' }}
      />
    </>
  );
};

export default Render;
