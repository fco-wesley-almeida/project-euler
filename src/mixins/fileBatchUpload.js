import exif from 'exif-js';
import firebase from 'firebase';
import {db, storage} from '@/firebase/config';

export default {
  data: () => ({
    files: [],
    resultURLs: [],
    maxIndex: 0,
    currentMaxIndex: 0,
    currentFileIndex: 0,
    selecting: false,
    delete: false,
    uploadTask: null,
    uploading: false,
    uploadName: "",
    uploadSize: 0,
    progress: 0,
    loading: false,
  }),
  computed:{
    collection () {
      return 'user'
    },
    document () {
      return 'userID'
    }
  },
  methods: {
    readFile(file) {
      return new Promise(resolve => {
        var reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    },

    getFilepath (filename) {
      return this.collection + '/' + this.document + '/content/' + filename;
    },

    rotate(img) {
      return new Promise(resolve => {
        const canvas = document.createElement("canvas");
        exif.getData(img, function() {
          var orientation = exif.getAllTags(this).Orientation;
          if ([5, 6, 7, 8].indexOf(orientation) > -1) {
            canvas.width = img.height;
            canvas.height = img.width;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }
          var ctx = canvas.getContext("2d");
          switch (orientation) {
            case 2:
              ctx.transform(-1, 0, 0, 1, img.width, 0);
              break;
            case 3:
              ctx.transform(-1, 0, 0, -1, img.width, img.height);
              break;
            case 4:
              ctx.transform(1, 0, 0, -1, 0, img.height);
              break;
            case 5:
              ctx.transform(0, 1, 1, 0, 0, 0);
              break;
            case 6:
              ctx.transform(0, 1, -1, 0, img.height, 0);
              break;
            case 7:
              ctx.transform(0, -1, -1, 0, img.height, img.width);
              break;
            case 8:
              ctx.transform(0, -1, 1, 0, 0, img.width);
              break;
            default:
              ctx.transform(1, 0, 0, 1, 0, 0);
          }
          ctx.drawImage(img, 0, 0, img.width, img.height);
          resolve({
            data: canvas.toDataURL("image/jpeg", 0.9),
            width: canvas.width,
            height: canvas.height
          });
        });
      });
    },

    didTapCancel() {
      if (this.uploadTask) {
        this.uploadTask.cancel();
      }
      this.loading = false;
      this.uploading = false;
      this.files = [];
      this.currentFileIndex = 0;
    },

    setupBatch(files) {
      this.files = files;
      this.manageUploads();
    },
    manageUploads() {
      var _this = this;
      if (this.currentFileIndex < this.files.length) {
        var fr = new FileReader();
        fr.onload = function() {
          // file is loaded
          let file = _this.files[_this.currentFileIndex];
          if (file.type.includes("image")) {
            var img = new Image();
            img.onload = function () {
              _this.rotate(img).then(response => {
                _this.createFile(
                  file,
                  response.data
                );
                _this.currentFileIndex++;
              });
            };
            img.src = fr.result;
          } else {
            _this.createFile(
              file,
              fr.result
            );
            _this.currentFileIndex++;
          }
        }
        fr.readAsDataURL(this.files[this.currentFileIndex]);
      } else {
        this.uploadsFinished();
        this.files = [];
        this.uploading = false;
        this.currentFileIndex = 0;
      }
    },
    createFile(file, data) {
      this.uploadName = (new Date()).getTime() + '_' + file.name;
      this.uploadSize = (file.size / 1024 / 1024).toFixed(2) + "MB";
      let type = file.type.split("/")[0] || "";
      let extension = file.type.split("/")[1] || "";
      let storageRef = storage.ref();
      this.uploadTask = storageRef
        .child(this.getFilepath(file.name))
        .putString(data, "data_url");
      let vm = this;
      this.uploadTask.on(
        "state_changed",
        function(snapshot) {
          vm.uploading = true;
          vm.progress = parseFloat((
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(0));
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              break;
          }
        },
        function(error) {
          // Handle unsuccessful uploads
        },
        function() {
          vm.progress = 0;
          vm.uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            vm.resultURLs.push(downloadURL);
            vm.manageUploads();
          })
        }
      );
    },
    async uploadsFinished () {}
  }
};
