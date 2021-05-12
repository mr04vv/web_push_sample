class Api::NotificationsController < ApplicationController
    def create
        PushNotification.new.send_notification("sample notify", "kokoni body ga hairuyo", params[:token])
    end

    def sleep_notify
        sleep(4)
        PushNotification.new.send_notification("test notification after 4seconds", "sugokunaidesuka?", params[:token])
    end
end
