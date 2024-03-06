import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function FileUpload() {
  const [files, setFiles] = useState({});

  const addFile = (file) => {
    const isImage = file.type.match('image.*');
    const objectURL = URL.createObjectURL(file);

    setFiles((prevFiles) => ({
      ...prevFiles,
      [objectURL]: file
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dt = event.dataTransfer;
    if (dt.items) {
      for (let i = 0; i < dt.items.length; i++) {
        if (dt.items[i].kind === 'file') {
          const file = dt.items[i].getAsFile();
          addFile(file);
        }
      }
    } else {
      for (let i = 0; i < dt.files.length; i++) {
        const file = dt.files[i];
        addFile(file);
      }
    }
  };

  const handleCancel = () => {
    setFiles({});
  };

  return (
    <div className="mt-0 bg-white h-screen w-screen sm:px-8 md:px-16 sm:py-8">
      <main className="container mx-auto max-w-screen-lg h-full">
        <article
          aria-label="File Upload Modal"
          className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div id="overlay" className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
            <i>
              <svg className="fill-current w-12 h-12 mb-3 text-yellow-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
              </svg>
            </i>
            <p className="text-lg text-yellow-500">Drop Pictures to Upload</p>
          </div>

          <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Drag and Drop Files</span>
              </p>
              <input id="hidden-input" type="file" multiple className="hidden" />
              <button id="button" className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                Upload a Picture
              </button>
            </header>

            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
              To Upload
            </h1>

            <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
              {Object.keys(files).map((url) => (
                <li key={url} className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                  <article tabIndex="0" className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer">
                    <img alt="upload preview" className="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed" src={url} />
                    <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                      <h1 className="flex-1"></h1>
                      <div className="flex">
                        <span className="p-1">
                          <i>
                            <svg className="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                            </svg>
                          </i>
                        </span>
                        <p className="p-1 size text-xs">{files[url].size > 1024 ? files[url].size > 1048576 ? Math.round(files[url].size / 1048576) + 'mb' : Math.round(files[url].size / 1024) + 'kb' : files[url].size + 'b'}</p>
                        <button className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md">
                          <svg className="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path className="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                          </svg>
                        </button>
                      </div>
                    </section>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <footer className="flex justify-end px-8 pb-8 pt-4">
            <button id="submit" className="rounded-sm px-3 py-1 bg-yellow-500 hover:bg-yellow-400 text-white focus:shadow-outline focus:outline-none">
              Upload
            </button>
            <button onClick={handleCancel} className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Cancel
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}

export default FileUpload;
