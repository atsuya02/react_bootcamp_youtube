import { Button, TextField, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { useVideoUpload } from "hooks/VideoUpload";
import { GlobalUser } from "stores/User";
import useStyles from "pages/Upload/UploadForm/style"

export type UploadFormProps = {
  videoFile: File | undefined;
  thumbFile: File | undefined;
};

export const UploadForm = ({ videoFile, thumbFile }: UploadFormProps) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const user = useRecoilValue(GlobalUser);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [errorMessage, setErrorMessage] = useState<Error>();
  const { upload, loading, error: uploadError } = useVideoUpload();

  const submit = () => {
    setErrorMessage(undefined);

    if (!user?.id) {
      return setErrorMessage(new Error("ログインされていません。"));
    }
    if (!videoFile || !thumbFile) {
      return setErrorMessage(new Error("ファイルを選択してください。"));
    }
    if (!titleRef.current?.value) {
      return setErrorMessage(new Error("タイトルを入力してください。"));
    }

    upload({
      file: {
        video: videoFile,
        thumbnail: thumbFile,
      },
      title: titleRef.current.value,
      description: descRef.current?.value,
      ownerId: user.id,
    }).then((data) => {
      if (data?.id) {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    setErrorMessage(uploadError);
  }, [uploadError]);

  return (
    <>
      <label className={styles.label}>
        <Typography variant="body2">タイトル</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          inputRef={titleRef}
        />
      </label>

      <label className={styles.label}>
        <Typography variant="body2">説明</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          inputRef={descRef}
        />
      </label>

      {errorMessage?.message && (
        <label className={styles.label}>
          <Typography color="error">
            {errorMessage.message}
          </Typography>
        </label>
      )}

      <div className={styles.butotn}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={submit}
        >
          {loading ? "アップロード中" : "動画をアップロード"}
        </Button>
      </div>
    </>
  );
};
