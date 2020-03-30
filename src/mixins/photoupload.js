import exif from 'exif-js'
import {db, storage} from '@/firebase/config'

export default {
  data: () => ({
    file: null,
    resultFile: null,
    uploadTask: null,
    uploading: false,
    uploadName: '',
    uploadSize: 0,
    progress: 0
  }),
  computed: {
    fileinputID () {
      return 'fileInput'
    },
    collection () {
      return 'user'
    },
    document () {
      return 'userID'
    },
    previewImageID () {
      return 'previewImage'
    },
    filepath () {
      return this.collection + '/' + this.document
    }
  },
  methods: {
    didTapAddImage () {
      var fileInput = document.getElementById(this.fileinputID)
      fileInput.click()
    },

    didTapCancel () {
      if (this.uploadTask) {
        this.uploadTask.cancel()
      }
      this.uploading = false
    },

    readFile (file) {
      return new Promise(resolve => {
        var reader = new FileReader()
        reader.onload = e => resolve(e.target.result)
        reader.readAsDataURL(file)
      })
    },

    rotate (img) {
      return new Promise(resolve => {
        const canvas = document.createElement('canvas')

        exif.getData(img, function () {
          var orientation = exif.getAllTags(this).Orientation

          if ([5, 6, 7, 8].indexOf(orientation) > -1) {
            canvas.width = img.height
            canvas.height = img.width
          } else {
            canvas.width = img.width
            canvas.height = img.height
          }

          var ctx = canvas.getContext('2d')

          switch (orientation) {
            case 2:
              ctx.transform(-1, 0, 0, 1, img.width, 0)
              break
            case 3:
              ctx.transform(-1, 0, 0, -1, img.width, img.height)
              break
            case 4:
              ctx.transform(1, 0, 0, -1, 0, img.height)
              break
            case 5:
              ctx.transform(0, 1, 1, 0, 0, 0)
              break
            case 6:
              ctx.transform(0, 1, -1, 0, img.height, 0)
              break
            case 7:
              ctx.transform(0, -1, -1, 0, img.height, img.width)
              break
            case 8:
              ctx.transform(0, -1, 1, 0, 0, img.width)
              break
            default:
              ctx.transform(1, 0, 0, 1, 0, 0)
          }
          ctx.drawImage(img, 0, 0, img.width, img.height)
          resolve({
            data: canvas.toDataURL('image/png', 0.9),
            width: canvas.width,
            height: canvas.height
          })
        })
      })
    },

    didChangeImage (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.file = files[0]
      this.currentMaxIndex = this.maxIndex
      this.setPreviewImage(this.file)
    },

    setPreviewImage (file) {
      var _this = this

      var fr = new FileReader()

      fr.onload = function () {
        // file is loaded
        _this.resultFile = fr.result
        _this.$refs[_this.previewImageID].src = fr.result // is the data URL because called with readAsDataURL
      }

      fr.readAsDataURL(file)
    },

    createFile () {
      var vm = this
      var img = new Image()
      img.onload = function () {
        vm.rotate(img).then(response => {
          const {data, width, height} = response
          vm.uploadName = vm.file.name
          vm.uploadSize = (vm.file.size / 1024 / 1024).toFixed(2) + 'MB'
          let extension = vm.file.type.split('/')[1] || ''
          var storageRef = storage.ref()
          // this.uploadTask = storageRef.child('portfolio/' + newKey).putString(base64, 'data_url')
          vm.uploadTask = storageRef
            .child(vm.filepath)
            .putString(data, 'data_url')
          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          vm.uploadTask.on(
            'state_changed',
            function (snapshot) {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              vm.uploading = true
              vm.progress = (
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
              ).toFixed(0) || 0
              switch (snapshot.state) {
                case storage.TaskState.PAUSED: // or 'paused'
                  break
                case storage.TaskState.RUNNING: // or 'running'
                  break
              }
            },
            function (error) {
              // Handle unsuccessful uploads
              if (error) {
                vm.didTapCancel();
              }
            },
            function () {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              vm.uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                db.collection(vm.collection)
                  .doc(vm.document)
                  .update({imageURL: downloadURL})
                  .then(function () {
                    vm.uploadFinished(downloadURL)
                  })
              })
            }
          )
        })
      }
      img.src = vm.resultFile
    },

    uploadFinished (downloadURL) {}
  }
}
