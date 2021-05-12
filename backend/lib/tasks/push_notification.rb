require "googleauth"
class PushNotification
  FIREBASE_URI = URI.parse("https://fcm.googleapis.com/v1/projects/web-push-4a4f2/messages:send")

  def send_notification(title, body, fcm_token, url = "https://wevox.io")
    if fcm_token.nil?
      err = "TOKEN_IS_NULL"
      return err
    end
    http = build_http
    req = build_request(title, body, fcm_token, url)

    if req.present?
      res = http.request(req)
      if res.code != "200"
        res = JSON.parse(res.body)
        error_code = res["error"]["details"][0]["errorCode"]
        return error_code
      end
    end

    true
  end

  private

  def build_http
    http = Net::HTTP.new(FIREBASE_URI.host, FIREBASE_URI.port)
    http.use_ssl = true
    http
  end

  def build_request(title, body, fcm_token, url)
    req = Net::HTTP::Post.new(FIREBASE_URI.request_uri)

    req["Content-Type"] = "application/json"
    req["Authorization"] = authorization_header
    req.body = data(title, body, fcm_token, url).to_json
    req
  end

  def data(title, body, fcm_token, url)
    args = {
        notification: {
            title: title,
            body: body
        },
        webpush: {
            fcm_options: {
                link: url
            }
        }
    }
    if fcm_token.present?
        args[:token] = fcm_token
    elsif topic.present?
        args[:topic] = topic
    elsif condition.present?
        args[:condition] = condition
    end
    { message: args }
  end

  def authorization_header
    authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: File.open('./app/web-push-4a4f2-firebase-adminsdk-tqr3p-d978d10078.json'),
      scope: "https://www.googleapis.com/auth/firebase.messaging"
    )
    access_token = authorizer.fetch_access_token!["access_token"]
    "Bearer #{access_token}"
  end
end
